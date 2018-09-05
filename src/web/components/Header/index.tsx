import * as React from 'react';
import AppState from '../../../stores/app';
import {di} from 'jsmodules';
import {observer} from 'mobx-react';
import {LText} from '../LText';

@observer
class Header extends React.Component < any,
any > {

    @di.Inject()app : AppState;

    public render() : JSX.Element {return(
            <header
                style={{
                textAlign: 'right',
                padding: '20px',
                color: '#fff',
                background: '#cb3837'
            }}></header>
        );}
}

export default Header;
