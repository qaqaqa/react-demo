import * as React from 'react';
import LoginForm from './components/LoginForm';
import { Redirect, RouteComponentProps } from 'react-router';
import './style.less';
import { message } from 'antd';

class Login extends React.Component<RouteComponentProps<any>, any> {
	state = {
		redirectToReferrer: false
	};
	handleSubmit = async (values) => {
		try {
			this.setState({ redirectToReferrer: true });
		} catch (ex) {
			alert('用户名或密码错误');
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
					<span>登录</span>
				</div>
				<LoginForm onSubmit={this.handleSubmit} />
			</div>
		);
	}
}

export default Login;
