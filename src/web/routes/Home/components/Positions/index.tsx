import * as React from 'react';
import { di } from 'jsmodules';
import { PositionState, OrderState } from '../../../../../stores/bitmex/subscribes';
import { Table, Button } from 'antd';
import { observer } from 'mobx-react';
import BitmexService from '../../../../../services/bitmex';
const { Column } = Table;
export interface OrderTableProps { }

@observer
export default class PositionTable extends React.Component<OrderTableProps, any> {
    @di.Inject() positionState: PositionState;

    @di.Inject() orderState: OrderState;

    @di.Inject() bitmexService: BitmexService;

    handleSellLimit = async (symbol, lastPrice) => {
        var value = prompt('确定以以下平仓?', lastPrice);
        if (value != '') {
            try {
                await this.bitmexService.closeLimit(value, symbol);
            }
            catch (ex) {
                if (ex.response && ex.response.data) {
                    var res = ex.response.data;
                    alert(res.error.message);
                } else {
                    alert(ex.message);
                }
            }
        }
    };

    handleSellMarket = async (symbol) => {

        if (confirm('确定以市价平仓')) {

            try {
                this.bitmexService.closeMarket();
            }
            catch (ex) {
                if (ex.response && ex.response.data) {
                    var res = ex.response.data;
                    alert(res.error.message);
                } else {
                    alert(ex.message);
                }
            }
        }

    };

    handleCancelOrder = (orderId) => {
        this.bitmexService.cancelOrder(orderId);
    };

    public render() {
        var positions = [];
        this.positionState.positions.forEach((value, key) => {
            if (value.currentQty != 0) {
                positions.push(value);
            }
        });
        var ping = {};
        this.orderState.ordres.forEach((value, key) => {
            if (value.execInst == 'Close' && value.ordStatus != 'Canceled' && value.ordStatus != 'Filled') {
                ping[value.symbol] = {
                    price: value.price,
                    orderId: value.orderID
                };
            }
        });

        return (
            <Table dataSource={positions} rowKey="symbol" size="middle">
                <Column title="合约" dataIndex="symbol" key="symbol" />
                <Column title="目前仓位数量" dataIndex="currentQty" key="currentQty" />
                <Column title="价值" dataIndex="homeNotional" key="homeNotionalCurr"
                    render={(value, record) => {
                        return value
                    }}
                />
                <Column title="开仓价格" dataIndex="avgCostPrice" key="avgCostPrice" />
                <Column title="标记价格" dataIndex="markPrice" key="markPrice" />
                <Column title="强平价格" dataIndex="liquidationPrice" key="liquidationPrice" />
                <Column title="保证金" dataIndex="maintMargin" key="assignedMargin" render={(maintMargin, record: any) => {

                    return <span>{maintMargin / Math.pow(10, 8)} XBT({record.crossMargin ? '全仓' : `${record.leverage}x`})</span>

                }} />
                <Column title="未实现盈亏" dataIndex="unrealisedGrossPnl" key="unrealisedPnl" render={(value, record: any) => {

                    return `${value / Math.pow(10, 8)} XBT(${(record.unrealisedRoePcnt * 100).toFixed(2)})%`
                }} />
                <Column title="已实现盈亏" dataIndex="realisedGrossPnl" key="realisedGrossPnl" render={(value, record: any) => {
                    if (!value) {
                        return `0 XBT`
                    }
                    return `${value / Math.pow(10, 8)} XBT`
                }} />
                <Column
                    title="平仓"
                    key="actions"
                    render={(value, record: any) => {
                        var item = ping[value.symbol];
                        if (item) {
                            return (
                                <div>
                                    在 {item.price} 的平仓委托
									<Button
                                        onClick={() => {
                                            this.handleCancelOrder(item.orderId);
                                        }}
                                    >
                                        取消
									</Button>
                                </div>
                            );
                        }
                        return (
                            <div>
                                <Button
                                    onClick={() => {
                                        this.handleSellLimit(record.symbol, record.lastPrice);
                                    }}
                                >
                                    平仓
								</Button>
                                <Button
                                    onClick={() => {
                                        this.handleSellMarket(record.lastPrice);
                                    }}
                                >
                                    市价
								</Button>
                            </div>
                        );
                    }}
                />
            </Table>
        );
    }
}
