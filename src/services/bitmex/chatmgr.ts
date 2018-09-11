import * as _ from 'lodash';
import { Events } from 'jsmodules/lib/events';
import { Logger } from '../../utils/logger';
import { di } from 'jsmodules';
import HicoinService from '../hicoin';

type WebSocketMessage = {
	table: string;
	action: 'partial' | 'update' | 'insert' | 'delete';
	// 这里发出一组数据行。 他们是在结构上与从 REST API 返回的数据相同。
	data: Object[];

	//
	// 以下字段定义了数据表，仅在`partial`中发送
	//

	// 每个数据对象的特征名称是唯一的
	// 如果提供多个，则采用复合键名 (key)。
	// 使用这些 key 的名称来唯一地标识数据列。
	// 你接收的左右数据均包含 key 列。
	keys?: string[];

	// 这里列出了与其他数据表的数据键之间的关系。
	// 例如，`quote`的外部键是 {"symbol": "instrument"}
	foreignKeys?: { [key: string]: string };

	// 这里列举了数据表的数据类型。 可能的类型为：
	// "symbol" - 在大多数语言中类似于 "string"
	// "guid"
	// "timestamp"
	// "timespan"
	// "float"
	// "long"
	// "integer"
	// "boolean"
	types?: { [key: string]: string };

	// 如果存在对于同一数据表的多个订阅，请使用 `filter` 来指明不同的订阅
	// 所包含的数据，这是因为 `table` 属性并不包括某一订阅的合约标记。
	filter?: { account?: number; symbol?: string };

	// 这些是我们内部的特征名称，用来代表这些数据是如何被排序已经组合的。
	attributes?: { [key: string]: string };
};

export class BitmexWebSocketMgr extends Events {
	@di.Inject() private hicoinService: HicoinService;

	private __webSocket__: WebSocket;

	private lockReconnect = false;
	private urlProvider;

	constructor(urlProvider) {
		super();
		this.provider(urlProvider);
		this.connect();
	}

	private handleOpen = async (event) => {
		Logger.info('WS:聊天服务连接成功');

		var response = await this.hicoinService.getSignature('/realtime', 'GET', null);
		var data = response.data;
		this.send({ op: 'authKeyExpires', args: [ 'Miir7CLP79F5Q1MTV5jdbhmP', data.expires, data.sig ] });
		this.__last_sub__ = {};
		this.refreshSubs();
	};
	private handleClose = (event) => {
		Logger.info('WS:聊天服务连接断开', event.target.url, event.code);
		this.__webSocket__ = null;
		this.__last_sub__ = {};
		if (event.target['__code__'] != 4000 && event.code != 4000) {
			this.reconnect(2000);
		} else {
			Logger.info('WS:正常关闭连接,无需重连');
		}
	};

	private handleError = (event) => {
		Logger.info('WS:聊天服务连接错误', event.code);
		this.__webSocket__ = null;
		this.__last_sub__ = {};
		this.reconnect(2000);
	};

	private handleMessage = (event: MessageEvent) => {
		this.refreshServerTimer();
		if (event.data.indexOf('primus::ping::') > -1) {
			return;
		}
		var message: any = this.decodeMessage(event.data);
		if (message) {
			if (message.table) {
				this.trigger(message.table, message.data, message.action, message);
			}
			if (message.subscribe) {
				this.trigger(message.subscribe + '.ok', message.success, message.request, message);
			}
		}
	};

	private serverHeartBeatTimer;
	private refreshServerTimer() {
		clearTimeout(this.serverHeartBeatTimer);
		this.serverHeartBeatTimer = setTimeout(() => {
			Logger.info('服务器超时,20s没有收到消息,准备重新连');
			this.reconnect();
		}, 1000 * 20);
	}

	private send(obj) {
		try {
			if (this.__webSocket__ && this.__webSocket__.readyState == WebSocket.OPEN) {
				var data = this.encodeMessage(obj);
				this.__webSocket__.send(data);
				return true;
			}
			return false;
		} catch (ex) {
			Logger.info('WS:发送消息失败', ex);
			return false;
		}
	}

	private __subs__ = {};
	private __last_sub__ = {};
	private __sub_timer__;
	private refreshSubs() {
		clearTimeout(this.__sub_timer__);
		this.__sub_timer__ = setTimeout(() => {
			var last_keys = _.keys(this.__last_sub__);
			var next_keys = _.keys(this.__subs__);
			var removed_keys = _.difference(last_keys, next_keys);
			var added_keys = _.difference(next_keys, last_keys);
			if (removed_keys.length > 0) {
				Logger.info('WS:取消订阅消息', removed_keys);
				this.send({ op: 'unsubscribe', args: removed_keys });
			}
			if (added_keys.length > 0) {
				Logger.info('WS:订阅消息', added_keys);
				this.send({ op: 'subscribe', args: added_keys });
			}
			this.__last_sub__ = _.clone(this.__subs__);
			if (__DEV__) {
				var keys = _.keys(this.__last_sub__);
				Logger.info('WS:当前订阅:', keys);
			}
		});
	}

	private encodeMessage(message) {
		return JSON.stringify(message);
	}

	private decodeMessage(buffer) {
		return JSON.parse(buffer);
	}

	provider(urlProvider) {
		this.urlProvider = urlProvider;
		window['ChatMgr'] = this;
	}

	connect() {
		if (this.lockReconnect) return;
		this.lockReconnect = true;
		setTimeout(() => {
			var url = this.urlProvider();
			Logger.info('WS:消息服务正在连接', url);
			this.__webSocket__ = new WebSocket(url);
			this.__webSocket__.onopen = this.handleOpen;
			this.__webSocket__.onclose = this.handleClose;
			this.__webSocket__.onmessage = this.handleMessage;
			this.__webSocket__.onerror = this.handleError;
			this.lockReconnect = false;
		}, 1000);
	}

	close() {
		if (this.__webSocket__) {
			clearTimeout(this.serverHeartBeatTimer);
			Logger.info('WS:关闭上一次连接', this.__webSocket__);
			//IOS close的code 无效
			this.__webSocket__['__code__'] = 4000;
			this.__webSocket__.close(4000, 'none');
		}
		return this;
	}

	reconnect(timeout = 0) {
		this.__last_sub__ = {};
		this.close().connect();
	}
	addSub(subName) {
		if (!this.__subs__[subName]) {
			this.__subs__[subName] = 1;
		} else {
			this.__subs__[subName] += 1;
		}
		this.refreshSubs();
	}
	removeSub(subName) {
		if (this.__subs__[subName]) {
			this.__subs__[subName] -= 1;
		}
		//如果订阅数被减到0,就删除这个订阅
		if (this.__subs__[subName] == 0) {
			delete this.__subs__[subName];
		}
		this.refreshSubs();
	}
}
