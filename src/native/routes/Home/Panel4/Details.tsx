import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity, Slider, FlatList } from 'react-native'
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;
import CoinLineChart from '../components/CoinLineChart'
import { observer } from 'mobx-react';
import { di } from 'jsmodules';
import { OrderState, PositionState } from '../../../../stores/bitmex/subscribes';


type Props = {
    name: string,
}
@observer
class Details extends React.Component<Props, any> {

    @di.Inject() orderState: OrderState;
    @di.Inject() positionState: PositionState;


    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }

    _renderItem = (entry) => {
        entry = entry.item;
        const { name } = this.props;
        if (name == '仓位') {
            return <View style={{ marginTop: 20, borderColor: 'red', borderWidth: 2, borderRadius: 5 }}>
                <Text style={styles.textInputTitle}>合约：{entry.symbol}</Text>
                <Text style={styles.textInputTitle}>目前仓位数量：{entry.currentQty}</Text>
                <Text style={styles.textInputTitle}>价值：{entry.homeNotionalCurr}</Text>
                <Text style={styles.textInputTitle}>开仓价格：{entry.avgCostPrice}</Text>
                <Text style={styles.textInputTitle}>标记价格：{entry.markPrice}</Text>
                <Text style={styles.textInputTitle}>强平价格：{entry.liquidationPrice}</Text>
                <Text style={styles.textInputTitle}>保证金：{entry.assignedMargin}</Text>
                <Text style={styles.textInputTitle}>未实现盈亏(回报率%)：{entry.unrealisedPnl}</Text>
                <Text style={styles.textInputTitle}>已实现盈亏：{entry.combinedRealisedPnl}</Text>
                <Text style={styles.textInputTitle}>平仓：{entry.actions}</Text>
            </View>
        }
        else if (name == '已平仓仓位') {
            return <View style={{ marginTop: 20, borderColor: 'red', borderWidth: 2, borderRadius: 5 }}>
                <Text style={styles.textInputTitle}>合约</Text>
                <Text style={styles.textInputTitle}>已实现盈亏：100000</Text>
            </View>
        }
        else if (name == '活动委托') {
            return <View style={{ marginTop: 20, borderColor: 'red', borderWidth: 2, borderRadius: 5 }}>
                <Text style={styles.textInputTitle}>合约：{entry.symbol}</Text>
                <Text style={styles.textInputTitle}>数量：{entry.orderQty}</Text>
                <Text style={styles.textInputTitle}>价格：{entry.price}</Text>
                <Text style={styles.textInputTitle}>完全成交：{entry.cumQty}</Text>
                <Text style={styles.textInputTitle}>剩余：{entry.leavesQty}</Text>
                <Text style={styles.textInputTitle}>委托价值：{entry.grossValue}</Text>
                <Text style={styles.textInputTitle}>成交价格：{entry.avgPx}</Text>
                <Text style={styles.textInputTitle}>类型：{entry.ordType}</Text>
                <Text style={styles.textInputTitle}>状态：{entry.ordStatus}</Text>
                <Text style={styles.textInputTitle}>时间：{entry.timestamp}</Text>
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
        if (name == '仓位') {
            this.positionState.positions.forEach((value, key) => {
                data.push(value);
            });
        }
        else if (name == '活动委托')
            this.orderState.ordres.forEach((value, key) => {
                data.push(value);
            });
        return <View style={styles.bgView}>
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
        color: 'white',
        fontSize: 15,
        marginTop: 20,
        paddingBottom: 20
    },
    textInputTitle: {
        marginLeft: 20,
        color: 'white',
        fontSize: 15,
        marginTop: 7
    },
})

export default Details;