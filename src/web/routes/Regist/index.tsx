import * as React from 'react';
import RegistForm from './components/RegistForm';
import { Redirect, RouteComponentProps } from 'react-router';
import './style.less';
import { message } from 'antd';
import { di } from 'jsmodules';
import HicoinService from '../../../services/hicoin';

class Regist extends React.Component<RouteComponentProps<any>, any> {

    @di.Inject() hicoinService: HicoinService;

    state = {
        redirectToReferrer: false
    };

    handleSubmit = async (values) => {
        try {
            var response = await this.hicoinService.regist(values.userName, values.password);
            if (response.data) {
                alert("已经提交注册,注册成功后我们将用邮件通知你");
                this.setState({ redirectToReferrer: true });
            } else {
                alert("已经注册过了,如果没有收到邮件,请联系管理员");
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
