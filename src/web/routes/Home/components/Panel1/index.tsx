import * as React from 'react';
import { Collapse, Row, Input, Form, Col, Divider, Button } from 'antd';
import { di } from 'jsmodules';
import BitmexService from '../../../../../services/bitmex';

export default class extends React.Component<any> {
	@di.Inject() bitmexService: BitmexService;

	getInputValue = () => {
		var input1: any = this.refs.input1;
		var input2: any = this.refs.input2;
		return {
			qty: input1.input.value,
			price: input2.input.value
		};
	};

	handleBuy = async () => {
		try {
			var info = this.getInputValue();
			await this.bitmexService.buyLimit(info.price, info.qty);
		} catch (ex) {
			if (ex.response && ex.response.data) {
				var res = ex.response.data;
				alert(res.error.message);
			} else {
				throw ex;
			}
		}
	};

	handleSell = () => {
		try {
			var info = this.getInputValue();
			this.bitmexService.sellLimit(info.price, info.qty);
		} catch (ex) {
			if (ex.response && ex.response.data) {
				var res = ex.response.data;
				alert(res.error.message);
			} else {
				throw ex;
			}
		}
	};

	getUser = () => {};

	render() {
		return (
			<React.Fragment>
				<Row>
					<Col span={24}>
						<Input ref="input1" addonBefore="仓位" />
					</Col>
				</Row>
				<Divider style={{ margin: '10px 0' }} />
				<Row>
					<Col span={24}>
						<Input ref="input2" addonBefore="限价" />
					</Col>
				</Row>
				<Row style={{ textAlign: 'center', padding: '20px 0' }}>
					<Col span={11}>
						<Button style={{ width: '100%' }} type="default" onClick={this.handleBuy}>
							做多
						</Button>
						<label>成本:0.000001</label>
					</Col>
					<Col span={11} offset={2}>
						<Button style={{ width: '100%' }} type="danger" onClick={this.handleSell}>
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
