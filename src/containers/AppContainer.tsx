import * as React from 'react';
import { AppState } from '../stores/app';
import { AutoHttpFactory, AxiosRequestBuilder } from '../utils/http';
import { di, HttpFactory } from 'jsmodules';
import { WebKeyValueStorage } from '../storage/web/KeyValueStorage';
import TokenService from '../services/token';
import HicoinService from '../services/hicoin';
import BitmexService from '../services/bitmex';
import { BitmexWebSocketMgr } from '../services/bitmex/chatmgr';
import { OrderState, PositionState } from '../stores/bitmex/subscribes';

const { container } = di;

//#region http and api

container.bind('httpFactory').to(HttpFactory);

container.bind('hicoin_api_v1').toFactory(AutoHttpFactory).params('http://192.168.31.84:5050/api');

//#endregion

//#region global manager
container.bind('app').to(AppState).isSingletonScope();
container.bind('kvStorage').to(WebKeyValueStorage).params('Main').isSingletonScope();

container
	.bind('bitmexWebSocketMgr')
	.to(BitmexWebSocketMgr)
	.params((subscribe?) => {
		var p = '';
		if (subscribe) {
			p = `&subscribe=${subscribe}`;
		}
		return 'wss://testnet.bitmex.com/realtime?heartbeat=1' + p;
	})
	.isSingletonScope();

//#endregion
//#region services
container.bind('tokenService').to(TokenService);
container.bind('hicoinService').to(HicoinService);
container.bind('bitmexService').to(BitmexService);
//#endregion

//#region state
container.bind('orderState').to(OrderState).isSingletonScope();
container.bind('positionState').to(PositionState).isSingletonScope();
//#endregion

export function AppContainer(props) {
	return <React.Fragment>{props.children}</React.Fragment>;
}
