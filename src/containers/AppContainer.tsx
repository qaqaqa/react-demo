import * as React from 'react';
import { AppState } from '../stores/app';
import { AutoHttpFactory, AxiosRequestBuilder } from '../utils/http';
import { di, HttpFactory } from 'jsmodules';
import { WebKeyValueStorage } from '../storage/web/KeyValueStorage';
import TokenService from '../services/token';
import HicoinService from '../services/hicoin';
import BitmexService from '../services/bitmex';

const { container } = di;

//#region http and api

container.bind('httpFactory').to(HttpFactory);

container.bind('bitmex_api_v1').toFactory(AutoHttpFactory).params('https://testnet.bitmex.com/api/v1');
container.bind('hicoin_api_v1').toFactory(AutoHttpFactory).params('https://testnet.bitmex.com/api/v1');

//#endregion

//#region global manager
container.bind('app').to(AppState).isSingletonScope();
container.bind('kvStorage').to(WebKeyValueStorage).params('Main').isSingletonScope();

//#endregion
//#region services
container.bind('tokenService').to(TokenService);
container.bind('hicoinService').to(HicoinService);
container.bind('bitmexService').to(BitmexService);
//#endregion

export function AppContainer(props) {
	return <React.Fragment>{props.children}</React.Fragment>;
}
