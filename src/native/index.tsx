import './shim';

import * as React from 'react';
import AppRouter from './routes';
import { NativeAppContainer } from '../containers/NativeAppContainer';

export default function App() {
    return (
        <NativeAppContainer>
            <AppRouter />
        </NativeAppContainer>
    )
}