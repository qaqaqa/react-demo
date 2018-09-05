import * as React from 'react';
import { Row, Col, Slider } from 'antd';

export default class extends React.Component<any> {
	render() {
		return (
			<React.Fragment>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={24} style={{ textAlign: 'center', fontSize: '24px' }}>
						7329.0
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>价格来源</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						BitMEX指数
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>BitMEX 指数 的价格</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						111111
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>24小时交易量</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						123123123123123USD
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>未平仓合约数量</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						11111
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>资金费率</Col>
					<Col span={12}>-0.3%/4小时</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>资金费率</Col>
					<Col span={12}>0.0025 XBT</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>合约价值</Col>
					<Col span={12}>1 USD</Col>
				</Row>
			</React.Fragment>
		);
	}
}
