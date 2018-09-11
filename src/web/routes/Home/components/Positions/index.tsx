import * as React from 'react';
import { di } from 'jsmodules';
import { PositionState } from '../../../../../stores/bitmex/subscribes';
import { Table } from 'antd';
import { observer } from 'mobx-react';
const { Column } = Table;
export interface OrderTableProps {}

@observer
export default class PositionTable extends React.Component<OrderTableProps, any> {
	@di.Inject() positionState: PositionState;

	public render() {
		var positions = [];
		this.positionState.positions.forEach((value, key) => {
			positions.push(value);
		});
		return (
			<Table dataSource={positions} rowKey="symbol" size="middle">
				<Column title="合约" dataIndex="symbol" key="symbol" />
				<Column title="目前仓位数量" dataIndex="currentQty" key="currentQty" />
				<Column title="价值" dataIndex="homeNotionalCurr" key="homeNotionalCurr" />
				<Column title="开仓价格" dataIndex="avgCostPrice" key="avgCostPrice" />
				<Column title="标记价格" dataIndex="markPrice" key="markPrice" />
				<Column title="强平价格" dataIndex="liquidationPrice" key="liquidationPrice" />
				<Column title="保证金" dataIndex="assignedMargin" key="assignedMargin" />
				<Column title="未实现盈亏" dataIndex="unrealisedPnl" key="unrealisedPnl" />
				<Column title="已实现盈亏" dataIndex="combinedRealisedPnl" key="combinedRealisedPnl" />
				<Column title="平仓" key="actions" />
			</Table>
		);
	}
}
