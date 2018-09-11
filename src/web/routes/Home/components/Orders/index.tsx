import * as React from 'react';
import { di } from 'jsmodules';
import { OrderState } from '../../../../../stores/bitmex/subscribes';
import { Table } from 'antd';
import { observer } from 'mobx-react';
const { Column } = Table;
export interface OrderTableProps {}
@observer
export default class OrderTable extends React.Component<OrderTableProps, any> {
	@di.Inject() orderState: OrderState;

	public render() {
		var orders = [];
		this.orderState.ordres.forEach((value, key) => {
			orders.push(value);
		});
		return (
			<Table dataSource={orders} rowKey="orderID" size="middle">
				<Column title="合约" dataIndex="symbol" key="symbol" />
				<Column title="数量" dataIndex="orderQty" key="orderQty" />
				<Column title="价格" dataIndex="price" key="price" />
				<Column title="完全成交" dataIndex="cumQty" key="cumQty" />
				<Column title="剩余" dataIndex="leavesQty" key="leavesQty" />
				<Column title="委托价值" dataIndex="grossValue" key="grossValue" />
				<Column title="成交价格" dataIndex="avgPx" key="avgPx" />
				<Column title="类型" dataIndex="ordType" key="ordType" />
				<Column title="状态" dataIndex="ordStatus" key="ordStatus" />
				<Column title="时间" dataIndex="timestamp" key="timestamp" />
			</Table>
		);
	}
}
