import * as React from 'react';
import { Row, Col, Slider } from 'antd';
import { observer } from 'mobx-react';
import { di } from 'jsmodules';
import { InstrumentState } from '../../../../../stores/bitmex/subscribes';

@observer
export default class extends React.Component<any> {
    @di.Inject() instrumentState: InstrumentState;

    render() {
        var instrument = this.instrumentState.instrument.get('XBTUSD');
        if (!instrument) {
            return null;
        }
        return (
            <React.Fragment>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={24} style={{ textAlign: 'center', fontSize: '24px' }}>
                        {instrument.lastPrice}
                    </Col>
                </Row>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={12}>价格来源</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        BitMEX指数
					</Col>
                </Row>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={12}>资金费率</Col>
                    <Col span={12}>{instrument.fundingRate * 100} % / x?小时</Col>
                </Row>
                <Row style={{ padding: '0 0 10px 0' }}>
                    <Col span={12}>合约价值</Col>
                    <Col span={12}>1 USD</Col>
                </Row>
            </React.Fragment>
        );
    }
}
