import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity, Slider, FlatList } from 'react-native'
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import CoinLineChart from '../components/CoinLineChart'
import { observer } from 'mobx-react';
import { di } from 'jsmodules';
import { OrderState, PositionState } from '../../../../stores/bitmex/subscribes';
import BitmexService from '../../../../services/bitmex';
var ping = {};

type Props = {
    name: string,
}
@observer
class Details extends React.Component<Props, any> {

    @di.Inject() orderState: OrderState;
    @di.Inject() positionState: PositionState;
    @di.Inject() bitmexService: BitmexService;

    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }

    handleClear = (orderID) => {
        this.orderState.ordres.delete(orderID);
    };

    handleCancel = (orderID) => {
        this.bitmexService.cancelOrder(orderID);
    };

    handleSellLimit = (symbol, orderID) => {
        var input: any = this.refs.input3;
        var lastPrice = input._lastNativeText;
        if (lastPrice) {
            this.bitmexService.closeLimit(lastPrice, symbol);
        }
    };

    handleSellMarket = (symbol) => {
        this.bitmexService.closeMarket();
    };

    handleCancelOrder = (orderId) => {
        this.bitmexService.cancelOrder(orderId);
    };

    _renderItem = (entry) => {
        entry = entry.item;
        const { name } = this.props;
        if (name == '仓位') {
            var view1 = null;
            var view2 = null;
            var item = ping[entry.symbol];
            if (item) {
                view1 = (
                    <View>
                        <Text style={styles.textInputTitle}>在{entry.price} 的平仓委托</Text>
                        <TouchableOpacity style={styles.touchable1} onPress={() => {
                            this.handleClear(entry.orderID);
                        }}>
                            <Text style={styles.touchableText1}>取消</Text>
                        </TouchableOpacity>
                    </View>

                );
            }
            view2 = (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.touchable1} onPress={() => {
                        this.handleSellLimit(entry.symbol, entry.orderID);
                    }}>
                        <Text style={styles.touchableText1}>平仓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchable2} onPress={
                        () => {
                            this.handleSellMarket(entry.lastPrice);
                        }
                    }>
                        <Text style={styles.touchableText1}>市价</Text>
                    </TouchableOpacity>
                </View>
            )
            return <View style={{ marginTop: 20, borderColor: 'red', borderWidth: 2, borderRadius: 5 }}>
                <Text style={styles.textInputTitle}>合约：{entry.symbol}</Text>
                <Text style={styles.textInputTitle}>目前仓位数量：{entry.currentQty}</Text>
                <Text style={styles.textInputTitle}>价值：{entry.homeNotional}</Text>
                <Text style={styles.textInputTitle}>开仓价格：{entry.avgCostPrice}</Text>
                <Text style={styles.textInputTitle}>标记价格：{entry.markPrice}</Text>
                <Text style={styles.textInputTitle}>强平价格：{entry.liquidationPrice}</Text>
                <Text style={styles.textInputTitle}>保证金：{entry.maintMargin / Math.pow(10, 8)} XBT({entry.crossMargin ? '全仓' : `${entry.leverage}x`})</Text>
                <Text style={styles.textInputTitle}>未实现盈亏(回报率%)：{`${entry.unrealisedGrossPnl / Math.pow(10, 8)} XBT(${(entry.unrealisedRoePcnt * 100).toFixed(2)})%`}</Text>
                <Text style={styles.textInputTitle}>已实现盈亏：{`${entry.realisedGrossPnl / Math.pow(10, 8)} XBT`}</Text>
                {
                    view1
                }
                {
                    view2
                }
            </View>
        }
        else if (name == '已平仓仓位') {
            return <View style={{ marginTop: 20, borderColor: 'red', borderWidth: 2, borderRadius: 5 }}>
                <Text style={styles.textInputTitle}>合约</Text>
                <Text style={styles.textInputTitle}>已实现盈亏：100000</Text>
            </View>
        }
        else if (name == '活动委托') {
            var view = null;
            if (entry.ordStatus == 'Filled' || entry.ordStatus == 'Canceled' || entry.orderState == 'Close') {
                view = (
                    <TouchableOpacity style={styles.touchable1} onPress={() => {
                        this.handleClear(entry.orderID);
                    }}>
                        <Text style={styles.touchableText1}>清除</Text>
                    </TouchableOpacity>
                );
            } else {
                view = (
                    <TouchableOpacity style={styles.touchable1} onPress={() => {
                        this.handleCancel(entry.orderID);
                    }}>
                        <Text style={styles.touchableText1}>取消</Text>
                    </TouchableOpacity>
                );
            }
            return <View style={{ marginTop: 20, borderColor: 'red', borderWidth: 2, borderRadius: 5 }}>
                <Text style={styles.textInputTitle}>合约：{entry.symbol}</Text>
                <Text style={styles.textInputTitle}>数量：{entry.orderQty}</Text>
                <Text style={styles.textInputTitle}>价格：{entry.price}</Text>
                <Text style={styles.textInputTitle}>完全成交：{entry.cumQty}</Text>
                <Text style={styles.textInputTitle}>剩余：{entry.leavesQty}</Text>
                <Text style={styles.textInputTitle}>委托价值：{`${(entry.orderQty / entry.price).toFixed(4)} XBT`}</Text>
                <Text style={styles.textInputTitle}>成交价格：{entry.avgPx}</Text>
                <Text style={styles.textInputTitle}>类型：{entry.ordType}</Text>
                <Text style={styles.textInputTitle}>状态：{entry.ordStatus}</Text>
                <Text style={styles.textInputTitle}>时间：{entry.timestamp}</Text>
                {
                    view
                }
            </View>
        }
        else if (name == '止损委托') {
            return <View style={{ marginTop: 20, borderColor: 'red', borderWidth: 2, borderRadius: 5 }}>
                <Text style={styles.textInputTitle}>合约</Text>
                <Text style={styles.textInputTitle}>数量：---</Text>
                <Text style={styles.textInputTitle}>价格：---</Text>
                <Text style={styles.textInputTitle}>完全成交：---</Text>
                <Text style={styles.textInputTitle}>剩余：---</Text>
                <Text style={styles.textInputTitle}>委托价值：---</Text>
                <Text style={styles.textInputTitle}>成交价格：---</Text>
                <Text style={styles.textInputTitle}>类型：---</Text>
                <Text style={styles.textInputTitle}>状态：---</Text>
                <Text style={styles.textInputTitle}>时间：---</Text>
            </View>
        }
        else if (name == '已成交') {
            return <View style={{ marginTop: 20, borderColor: 'red', borderWidth: 2, borderRadius: 5 }}>
                <Text style={styles.textInputTitle}>合约</Text>
                <Text style={styles.textInputTitle}>数量：---</Text>
                <Text style={styles.textInputTitle}>成交数量：---</Text>
                <Text style={styles.textInputTitle}>剩余：---</Text>
                <Text style={styles.textInputTitle}>成交价格：---</Text>
                <Text style={styles.textInputTitle}>价格：---</Text>
                <Text style={styles.textInputTitle}>价值：---</Text>
                <Text style={styles.textInputTitle}>类型：---</Text>
                <Text style={styles.textInputTitle}>委托ID：---</Text>
                <Text style={styles.textInputTitle}>时间：---</Text>
            </View>
        }
        else if (name == '委托历史') {
            return <View style={{ marginTop: 20, borderColor: 'red', borderWidth: 2, borderRadius: 5 }}>
                <Text style={styles.textInputTitle}>合约</Text>
                <Text style={styles.textInputTitle}>数量：---</Text>
                <Text style={styles.textInputTitle}>价格：---</Text>
                <Text style={styles.textInputTitle}>完全成交：---</Text>
                <Text style={styles.textInputTitle}>触发价格：---</Text>
                <Text style={styles.textInputTitle}>成交价格：---</Text>
                <Text style={styles.textInputTitle}>类型：---</Text>
                <Text style={styles.textInputTitle}>状态：---</Text>
                <Text style={styles.textInputTitle}>时间：---</Text>
            </View>
        }

    }

    render() {
        var data = [];
        const { name } = this.props;
        var view = null;
        if (name == '仓位') {

            this.positionState.positions.forEach((value, key) => {
                data.push(value);
            });
            if (data) {
                view = <TextInput
                    ref='input3'
                    autoFocus={true}
                    returnKeyType="done"
                    placeholder={'输入平仓价格'}
                    autoCorrect={false}
                    placeholderTextColor="black"
                    style={styles.textInput}>
                </TextInput>
            }

        }
        else if (name == '活动委托') {
            this.orderState.ordres.forEach((value, key) => {
                data.push(value);
            });
            this.orderState.ordres.forEach((value, key) => {
                if (value.execInst == 'Close' && value.ordStatus != 'Canceled') {
                    ping[value.symbol] = {
                        price: value.price,
                        orderId: value.orderID
                    };
                }
            });
        }
        return <View style={styles.bgView}>
            {view}
            <FlatList
                keyExtractor={this._extraUniqueKey}
                onEndReachedThreshold={0.01}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                data={data}>
            </FlatList>
        </View>
    }
}

const styles = StyleSheet.create({
    bgView: {
        paddingBottom: 30
    },
    title: {
        color: 'black',
        fontSize: 15,
        marginTop: 20,
        paddingBottom: 20
    },
    textInputTitle: {
        marginLeft: 20,
        color: 'black',
        fontSize: 15,
        marginTop: 7
    },
    touchable1: {
        backgroundColor: 'red',
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 20,
        marginTop: 20
    },
    touchable2: {
        backgroundColor: 'yellow',
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: '10%',
        marginTop: 20

    },
    touchableText1: {
        backgroundColor: 'transparent',
    },
    touchableText2: {
        backgroundColor: '#00000000',
        marginLeft: '50%',
    },
    textInput: {
        borderColor: 'gray',
        borderWidth:1,
        width: '30%',
        marginLeft: 15,
        fontSize: 18,
        borderRadius: 5,
        marginTop: 20
    },
})

export default Details;