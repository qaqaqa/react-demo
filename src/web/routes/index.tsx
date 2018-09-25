import * as React from 'react';
import App from './App';
import AppState from '../../stores/app';
import { di } from 'jsmodules';
import { notification } from 'antd';
import 'antd/dist/antd.css';

import '../styles/index.less';
import { SessionState } from '../../stores/session';

class AppRouter extends React.Component<{}, {}> {
    @di.Inject() app: AppState;

    @di.Inject() session: SessionState;

    componentDidMount() {
        this.app.start();

        this.session.on("Active").then(() => {

            notification.success({
                message: "账号激活成功通知",
                description: "恭喜你,你的账号已经成功激活,你可以进行交易了"
            })
        })
    }

    public render() {
        return <App />;
    }
}

export default AppRouter;
