import * as React from 'react';
import { Layout } from 'antd';
import { renderRoutes } from 'react-router-config';
const { Header } = Layout;
import './header.less';
import { di } from 'jsmodules';
import { SessionState } from '../../../stores/session';
import { Redirect } from 'react-router';

export default class extends React.Component<any> {

    @di.Inject() session: SessionState;

    public render() {
        if (!this.session.isAuthenticated) {
            return <Redirect to="/login" />
        }
        const { routes } = this.props.route;
        return (
            <Layout className="main-layout">
                <Header className="main-header">
                    <div className="logo">交易系统</div>
                </Header>
                {renderRoutes(routes)}
            </Layout>
        );
    }
}
