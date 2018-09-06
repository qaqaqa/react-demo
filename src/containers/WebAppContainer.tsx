import * as React from 'react';
import { AppContainer } from './AppContainer';
import { di, HttpFactory } from 'jsmodules';
import { WebKeyValueStorage as KeyValueStorage } from '../storage/web/KeyValueStorage';
import { I18nState } from '../stores/i18n';
import WebLang from '../i18n/web';

const { container } = di;

container.bind('kvStorage').to(KeyValueStorage).params('__APP_DATA__');

container.bind('i18n').to(I18nState).params(WebLang).isSingletonScope();

export function WebAppContainer(props) {
	return <AppContainer>{props.children}</AppContainer>;
}
