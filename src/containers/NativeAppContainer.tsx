import * as React from 'react';
import { AppContainer } from './AppContainer';
import { di } from 'jsmodules';
import { NativeKeyValueStorage as KeyValueStorage } from '../storage/native/KeyValueStorage';
import { AutoHttpFactory } from '../utils/http';

const {container} = di;

container.bind("kvStorage").to(KeyValueStorage).params("kvStorage");
container.bind('bitmex_api_v1').toFactory(AutoHttpFactory).params('https://testnet.bitmex.com/api/v1');
export function NativeAppContainer(props) {
    return <AppContainer>
        {props.children}
    </AppContainer>

}