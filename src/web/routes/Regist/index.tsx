import * as React from 'react';
import RegistForm from './components/RegistForm';
import { Redirect, RouteComponentProps } from 'react-router';
import './style.less';
import { message } from 'antd';
import { di } from 'jsmodules';
import HicoinService from '../../../services/hicoin';
import { SessionState } from '../../../stores/session';

class Regist extends React.Component<RouteComponentProps<any>, any> {

    @di.Inject() hicoinService: HicoinService;
    @di.Inject() session: SessionState;

    state = {
        redirectToReferrer: false
    };

    handleSubmit = async (values) => {
        try {
            var response = await this.hicoinService.regist(values.userName, values.password);
            if (response.data) {
                var success = await this.session.login(values.userName, values.password);
                if (success) {
                    this.props.history.replace("/");
                } else {
                    this.setState({ redirectToReferrer: true });
                }
            } else {
                alert("此已经注册过了,你可以直接登录");
                this.setState({ redirectToReferrer: true });
            }
        } catch (ex) {
            alert('注册失败:' + ex.message);
        } finally {
        }
    };

    render(): JSX.Element {
        const queryParams: any = {}; // queryString.resolve(this.props.location.search);
        const next = queryParams.next || '/';

        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to={next} />;
        }
        return (
            <div className="login-page">
                <div className="logo">
                    <span>注册</span>
                </div>
                <RegistForm onSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default Regist;
