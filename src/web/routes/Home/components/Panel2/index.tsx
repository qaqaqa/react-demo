import * as React from 'react';
import { Row, Col, Slider } from 'antd';
import { di } from 'jsmodules';
import { PositionState } from '../../../../../stores/bitmex/subscribes';
import { observer } from 'mobx-react';
import BitmexService from '../../../../../services/bitmex';

@observer
export default class extends React.Component<any> {
	@di.Inject() positionState: PositionState;
	@di.Inject() bitmexService: BitmexService;

	handleChange = (value) => {
		this.bitmexService.setLeverage(value);
	};

	render() {
		const xbtusd = this.positionState.positions.get('XBTUSD');
		if (!xbtusd) {
			return null;
		}
		var leverage = xbtusd.crossMargin ? 0 : xbtusd.leverage;
		return (
			<React.Fragment>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>合约数</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						{xbtusd.currentQty}
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>开仓价格</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						{xbtusd.avgCostPrice}
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>回报率</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						{xbtusd.unrealisedRoePcnt * 100} %
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>强平价格</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						{xbtusd.liquidationPrice}
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>杠杆</Col>
					<Col span={24}>
						<Slider defaultValue={leverage} onChange={this.handleChange} min={0} max={100} />
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
