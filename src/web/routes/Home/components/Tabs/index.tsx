import * as React from 'react';
import { Tabs } from 'antd';
import PositionTable from '../Positions';
import OrderTable from '../Orders';
import { observer } from 'mobx-react';
import { di } from 'jsmodules';
import { OrderState, PositionState } from '../../../../../stores/bitmex/subscribes';

export interface IAppProps {}

@observer
export default class HomeTabs extends React.Component<IAppProps, any> {
	@di.Inject() orderState: OrderState;
	@di.Inject() positionState: PositionState;
	public render() {
		return (
			<Tabs type="card">
				<Tabs.TabPane tab={`仓位[${this.positionState.positions.size}]`} key="1">
					<PositionTable />
				</Tabs.TabPane>
				<Tabs.TabPane tab={`活动委托[${this.orderState.ordres.size}]`} key="2">
					<OrderTable />
				</Tabs.TabPane>
			</Tabs>
		);
	}
}
