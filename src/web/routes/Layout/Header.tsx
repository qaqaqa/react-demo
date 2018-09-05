import * as React from 'react';
import { Layout } from 'antd';
import { renderRoutes } from 'react-router-config';
const { Header } = Layout;
import './header.less';

export default class extends React.Component<any> {
	public render() {
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
