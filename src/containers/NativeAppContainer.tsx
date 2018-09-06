import * as React from 'react';
import { AppContainer } from './AppContainer';
import { di } from 'jsmodules';
import { NativeKeyValueStorage as KeyValueStorage } from '../storage/native/KeyValueStorage';

const {container} = di;

container.bind("kvStorage").to(KeyValueStorage).params("kvStorage");

export function NativeAppContainer(props) {
    return <AppContainer>
        {props.children}
    </AppContainer>

}