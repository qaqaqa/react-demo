import * as React from 'react';
import { Row, Col, Slider } from 'antd';
import { observer } from 'mobx-react';
import { di } from 'jsmodules';
import { MarginState } from '../../../../../stores/bitmex/subscribes';
import BitmexService from '../../../../../services/bitmex';

@observer
export default class extends React.Component<any> {
    @di.Inject() bitmexService: BitmexService;
    @di.Inject() marginState: MarginState;
    state = {
        depositAddress: ""
    }
    async componentDidMount() {
        var response = await this.bitmexService.depositAddress();
        if (response.data) {
            this.setState({
                depositAddress: response.data
            })
        }
    }

    render() {
        var margin = this.marginState.margin.get("XBt")
        var z = 0, k = 0;
        if (margin) {
            z = margin.amount / Math.pow(10, 8);
            k = margin.availableMargin / Math.pow(10, 8);
        }
        return (
            <React.Fragment>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={24} style={{ wordBreak: 'break-all' }}>
                        {this.state.depositAddress}
                    </Col>
                    <Col span={24}>
                        <Col span={12}>总</Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            {z}
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={12}>可用</Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            {k}
                        </Col>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
