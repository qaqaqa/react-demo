import * as React from 'react';
import Panel1 from './components/Panel1';
import Panel2 from './components/Panel2';
import Panel3 from './components/Panel3';
import { Collapse, Layout, Card, Table } from 'antd';
import './styles/style.less';
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
		}, 5000);
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
					<Card title="仓位" loading={this.state.loading} bodyStyle={{ padding: 0, paddingTop: '1px' }}>
						<Table dataSource={[]} size="middle">
							<Column title="合约" dataIndex="col1" key="col1" />
							<Column title="目前仓位数量" dataIndex="col2" key="col2" />
							<Column title="价值" dataIndex="col3" key="col3" />
							<Column title="开仓价格" dataIndex="col4" key="col4" />
							<Column title="标记价格" dataIndex="col5" key="col5" />
							<Column title="强平价格" dataIndex="col6" key="col6" />
							<Column title="保证金" dataIndex="col7" key="col7" />
							<Column title="未实现盈亏(回报率%)" dataIndex="col8" key="col8" />
							<Column title="已实现盈亏" dataIndex="col9" key="col9" />
							<Column title="平仓" dataIndex="col10" key="col10" />
						</Table>
					</Card>
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
