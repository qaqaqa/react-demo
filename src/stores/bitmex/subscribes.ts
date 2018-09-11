import { observable } from 'mobx';
import { di } from 'jsmodules';
import { BitmexWebSocketMgr } from '../../services/bitmex/chatmgr';
import HicoinService from '../../services/hicoin';

class ConnectMgr {
	@di.Inject() private hicoinService: HicoinService;
	@di.Inject() bitmexWebSocketMgr: BitmexWebSocketMgr;

	constructor() {}

	async connect() {}
}

export class OrderState {
	@di.Inject() bitmexWebSocketMgr: BitmexWebSocketMgr;

	ordres = observable.map({}, { deep: false });

	constructor() {
		this.bitmexWebSocketMgr.on('order').then(this.resolveOrder);
		this.init();
	}

	async init() {
		this.bitmexWebSocketMgr.addSub('order');
	}

	resolveOrder = (data, action, message) => {
		if (action == 'partial') {
			this.ordres.clear();
		}
		for (const item of data) {
			switch (action) {
				case 'delete':
					this.ordres.delete(item.orderID);
					break;
				default:
					var last = this.ordres.get(item.orderID);
					this.ordres.set(item.orderID, { ...last, ...item });
			}
		}
	};
}

export class PositionState {
	@di.Inject() bitmexWebSocketMgr: BitmexWebSocketMgr;

	positions = observable.map({}, { deep: false });

	constructor() {
		this.bitmexWebSocketMgr.on('position').then(this.resolveOrder);
		this.init();
	}

	async init() {
		this.bitmexWebSocketMgr.addSub('position');
	}

	resolveOrder = (data, action, message) => {
		if (action == 'partial') {
			this.positions.clear();
		}
		for (const item of data) {
			switch (action) {
				case 'delete':
					this.positions.delete(item.symbol);
					break;
				default:
					var last = this.positions.get(item.symbol);
					this.positions.set(item.symbol, { ...last, ...item });
			}
		}
	};
}
