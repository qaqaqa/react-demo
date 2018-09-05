import * as React from 'react';
import { AppState } from '../stores/app';
import { AutoHttpFactory, AxiosRequestBuilder } from '../utils/http';
import { di, HttpFactory } from 'jsmodules';
import { WebKeyValueStorage } from '../storage/web/KeyValueStorage';

const { container } = di;

//#region http and api

container.bind('httpFactory').to(HttpFactory);

//#endregion #region global manager

container.bind('app').to(AppState).isSingletonScope();
container.bind('kvStorage').to(WebKeyValueStorage).params('Main').isSingletonScope();

//#endregion #region modules #endregion

export function AppContainer(props) {
	return <React.Fragment>{props.children}</React.Fragment>;
}
