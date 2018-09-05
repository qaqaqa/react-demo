import * as React from 'react';
import { Row, Col, Slider } from 'antd';

export default class extends React.Component<any> {
	render() {
		return (
			<React.Fragment>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>合约数</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						11111
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>开仓价格</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						11111
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>回报率</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						-33 %
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>强平价格</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						11111
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>杠杆</Col>
					<Col span={24}>
						<Slider defaultValue={0} max={100} />
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
