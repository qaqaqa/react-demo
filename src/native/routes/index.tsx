import * as React from 'react';
import App from './App';
import {
    NativeModules,
} from 'react-native';

class AppRouter extends React.Component < {}, {} > {

    render() {
        console.disableYellowBox = true;
        return <App/>
    }
}

export default AppRouter;