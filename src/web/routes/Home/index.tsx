import * as React from 'react';
import Panel1 from './components/Panel1';
import Panel2 from './components/Panel2';
import Panel3 from './components/Panel3';
import { Collapse, Layout, Card, Table, Tabs } from 'antd';
import './styles/style.less';
import { di } from 'jsmodules';
import { OrderState, PositionState } from '../../../stores/bitmex/subscribes';
import PositionTable from './components/Positions';
import OrderTable from './components/Orders';
import HomeTabs from './components/Tabs';
const { Content, Sider } = Layout;
const Panel = Collapse.Panel;
const { Column, ColumnGroup } = Table;

class Home extends React.Component<any, any> {
	state = {
		loading: true
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 500);
	}

	public render(): JSX.Element {
		return (
			<Layout>
				<Sider className="main-sider" width="260px">
					<Collapse bordered={false} className="main-collapse" defaultActiveKey={[ '1', '2', '3' ]}>
						<Panel key="1" header="买卖">
							<Panel1 />
						</Panel>
						<Panel key="2" header="持有仓位: XBTUSD">
							<Panel2 />
						</Panel>
						<Panel key="3" header="合约明细">
							<Panel3 />
						</Panel>
					</Collapse>
				</Sider>
				<Content style={{ padding: '20px' }}>
					<HomeTabs />
					<Card title="图表" loading={true} style={{ marginTop: '20px' }}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Content>
			</Layout>
		);
	}
}

export default Home;
