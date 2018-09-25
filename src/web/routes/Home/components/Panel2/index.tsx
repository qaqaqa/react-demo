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

    state = {
        leverage: 0
    }

    timer;

    handleChange = (value) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.bitmexService.setLeverage(value);
        }, 500);
        this.setState({
            leverage: value
        })
    };

    render() {
        const xbtusd = this.positionState.positions.get('XBTUSD');
        var currentQty = 0,
            avgCostPrice = 0,
            unrealisedRoePcnt = 0,
            liquidationPrice = 0,
            leverage = this.state.leverage;
        if (xbtusd) {
            currentQty = xbtusd.currentQty;
            avgCostPrice = xbtusd.avgCostPrice;
            unrealisedRoePcnt = xbtusd.unrealisedRoePcnt;
            liquidationPrice = xbtusd.liquidationPrice;
            leverage = xbtusd.crossMargin ? 0 : xbtusd.leverage;
        }

        return (
            <React.Fragment>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={12}>合约数</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        {currentQty}
                    </Col>
                </Row>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={12}>开仓价格</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        {avgCostPrice}
                    </Col>
                </Row>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={12}>回报率</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        {(unrealisedRoePcnt * 100).toFixed(2)} %
					</Col>
                </Row>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={12}>强平价格</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        {liquidationPrice}
                    </Col>
                </Row>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={12}>杠杆</Col>
                    <Col span={24}>
                        <Slider value={leverage} onChange={this.handleChange} min={0} max={100} />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
