import * as React from 'react';
import { Collapse, Row, Input, Form, Col, Divider, Button } from 'antd';

export default class extends React.Component<any> {
	render() {
		return (
			<React.Fragment>
				<Row>
					<Col span={24}>
						<Input addonBefore="仓位" />
					</Col>
				</Row>
				<Divider style={{ margin: '10px 0' }} />
				<Row>
					<Col span={24}>
						<Input addonBefore="限价" />
					</Col>
				</Row>
				<Row style={{ textAlign: 'center', padding: '20px 0' }}>
					<Col span={11}>
						<Button style={{ width: '100%' }} type="default">
							做多
						</Button>
						<label>成本:0.000001</label>
					</Col>
					<Col span={11} offset={2}>
						<Button style={{ width: '100%' }} type="danger">
							做空
						</Button>
						<label>成本:0.000001</label>
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>委托价值</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						1 XBT
					</Col>
				</Row>
				<Row style={{ padding: '0 0 10px 0' }}>
					<Col span={12}>可用余额</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						1 XBT
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
