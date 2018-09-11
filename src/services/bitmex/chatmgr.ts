import * as _ from 'lodash';
import { Events } from 'jsmodules/lib/events';
import { Logger } from '../../utils/logger';
import { di } from 'jsmodules';

type MessageType = 'JoinRoomMessage' | 'RoomMessage';

type ChatMessage = {
	type: MessageType;
	content: any;
};

export type JoinRoomMessage = {
	id: string;
	name: string;
	type: string;
	description: string;
};
type MessageFrom = 'self' | 'user';

export type RoomMessage = {
	content: string;
	creation_time: string;
	name: string;
	room_id: string;
	surname: string;
	message_type: string;
	user_avatar: string;
	user_id: string;
	username: string;
	id: string;
	from: MessageFrom;
};

const MessageSeparator = String.fromCharCode(0x1e);
const MessageSeparator_MsgPack = String.fromCharCode(0x00);
export class BitmexWebSocketMgr extends Events {
	private __webSocket__: WebSocket;
	private lockReconnect = false;
	private __room_map__ = {};
	private urlProvider;

	private handleOpen = (event) => {
		Logger.info('WS:聊天服务连接成功');
		this.__last_rooms__ = {};
		this.refreshRooms();
	};
	private handleClose = (event) => {
		Logger.info('WS:聊天服务连接断开', event.target.url, event.code);
		this.__webSocket__ = null;
		this.__last_rooms__ = {};
		if (event.target['__code__'] != 4000 && event.code != 4000) {
			this.reconnect(2000);
		} else {
			Logger.info('WS:正常关闭连接,无需重连');
		}
	};

	private handleError = (event) => {
		Logger.info('WS:聊天服务连接错误', event.code);
		this.__webSocket__ = null;
		this.__last_rooms__ = {};
		this.reconnect(2000);
	};

	private handleJoinRoom = (content: JoinRoomMessage) => {
		this.__room_map__[content.id] = content.name;
		this.trigger(`joinRoom@${content.name}`, content);
	};

	private handleRoomMessage = (room_id, messages: RoomMessage) => {
		var room_name = this.__room_map__[room_id];
		if (room_name) {
			this.trigger(`message@${room_name}`, messages);
		}
	};

	private resolveMessage = (messages: ChatMessage[]) => {
		var room_messages = {};
		for (var message of messages) {
			if (message.type == 'JoinRoomMessage') {
				this.handleJoinRoom(message.content);
			} else if (message.type == 'RoomMessage') {
				var msg = message.content;
				if (!room_messages[msg.room_id]) {
					room_messages[msg.room_id] = [];
				}
				room_messages[msg.room_id].push(msg);
			}
		}
		for (var room_id in room_messages) {
			var msgs = room_messages[room_id];
			this.handleRoomMessage(room_id, msgs);
		}
	};

	private handleMessage = (event: MessageEvent) => {
		this.refreshServerTimer();
		var messages = this.decodeMessage(event.data);
		if (messages) {
			this.resolveMessage(messages);
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

	private __rooms__ = {};

	private __last_rooms__ = {};

	private __room_timer__;
	private refreshRooms() {
		clearTimeout(this.__room_timer__);
		this.__room_timer__ = setTimeout(() => {
			var last_keys = _.keys(this.__last_rooms__);
			var next_keys = _.keys(this.__rooms__);
			var removed_keys = _.difference(last_keys, next_keys);
			var added_keys = _.difference(next_keys, last_keys);
			if (removed_keys.length > 0) {
				Logger.info('WS:退出房间', removed_keys);
				for (const room_name of removed_keys) {
					this.send({ type: 'LeaveRoom', content: { room_name: room_name } });
				}
			}
			if (added_keys.length > 0) {
				Logger.info('WS:进入房间', added_keys);
				for (const room_name of added_keys) {
					this.send({ type: 'JoinRoom', content: { room_name: room_name } });
				}
			}
			this.__last_rooms__ = _.clone(this.__rooms__);
			if (__DEV__) {
				var keys = _.keys(this.__last_rooms__);
				Logger.info('WS:房间总数:', keys);
			}
		});
	}

	private encodeMessage(message) {
		return JSON.stringify(message);
	}

	private decodeMessage(buffer) {
		var jsonResults = buffer.split(MessageSeparator);
		var messages = [];
		if (jsonResults.length > 1) {
			jsonResults = jsonResults.slice(0, jsonResults.length - 1);
			jsonResults.forEach((r) => {
				try {
					messages.push(JSON.parse(r));
				} catch (e) {
					console.log('parse json error', r, e);
				}
			});
		}
		return messages;
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
			Logger.info('WS:聊天服务正在连接', url);
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
		this.__last_rooms__ = {};
		this.close().connect();
	}

	joinRoom(room_name) {
		if (!this.__rooms__[room_name]) {
			this.__rooms__[room_name] = 1;
		} else {
			this.__rooms__[room_name] += 1;
		}
		this.refreshRooms();
	}
	leaveRoom(room_name) {
		if (this.__rooms__[room_name]) {
			this.__rooms__[room_name] -= 1;
		}
		//如果订阅数被减到0,就删除这个订阅
		if (this.__rooms__[room_name] == 0) {
			delete this.__rooms__[room_name];
		}
		this.refreshRooms();
	}

	sendInRoom(content) {
		var data = { type: 'SendMessageInRoom', content };
		return this.send(data);
	}
}
