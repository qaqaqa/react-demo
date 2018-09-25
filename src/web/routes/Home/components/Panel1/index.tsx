import * as React from 'react';
import { Collapse, Row, Input, Form, Col, Divider, Button } from 'antd';
import { di } from 'jsmodules';
import BitmexService from '../../../../../services/bitmex';
import toFixed2 from '../../../../../utils/toFixed2';

export default class extends React.Component<any> {
    @di.Inject() bitmexService: BitmexService;

    state = {
        count: 0,
        price: 0
    }

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
                alert(ex.message);
            }
        }
    };

    handleSell = async () => {
        try {
            var info = this.getInputValue();
            await this.bitmexService.sellLimit(info.price, info.qty);
        } catch (ex) {
            if (ex.response && ex.response.data) {
                var res = ex.response.data;
                alert(res.error.message);
            } else {
                alert(ex.message);
            }
        }
    };

    getUser = () => { };

    render() {
        var { count, price } = this.state;
        var value = '';
        if (count > 0 && price > 0) {
            value = toFixed2(count / price, 4);
        }
        return (
            <React.Fragment>
                <Row>
                    <Col span={24}>
                        <Input ref="input1" onInput={(e) => { this.setState({ count: +e.target['value'] }) }} addonBefore="仓位" />
                    </Col>
                </Row>
                <Divider style={{ margin: '10px 0' }} />
                <Row>
                    <Col span={24}>
                        <Input ref="input2" onInput={(e) => { this.setState({ price: +e.target['value'] }) }} addonBefore="限价" />
                    </Col>
                </Row>
                <Row style={{ textAlign: 'center', padding: '20px 0' }}>
                    <Col span={11}>
                        <Button style={{ width: '100%' }} type="default" onClick={this.handleBuy}>
                            做多
						</Button>
                    </Col>
                    <Col span={11} offset={2}>
                        <Button style={{ width: '100%' }} type="danger" onClick={this.handleSell}>
                            做空
						</Button>
                    </Col>
                </Row><Col span={24}>
                    <Col span={12}>委托价值</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        {value}
                    </Col>
                </Col>
            </React.Fragment>
        );
    }
}
