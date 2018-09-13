import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity, Slider } from 'react-native'
import { di } from 'jsmodules';
import { InstrumentState } from '../../../../stores/bitmex/subscribes';
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;

class Panel3 extends React.Component<any, any> {
    @di.Inject() InstrumentState: InstrumentState;
    render() {
        debugger
        if(this.InstrumentState.instrument){
            var instrument = this.InstrumentState.instrument[0];
        }
        return <View style={styles.bgView}>
            <Text style={styles.title}>合约明细</Text>

            <Text style={styles.priceText}>{instrument.lastPriceProtected}</Text>
            <Text style={styles.priceText}>指数价格：{instrument.fairPrice}/标记价格：{instrument.markPrice}</Text>
            <Text style={styles.textInputTitle}>价格来源：BitMex指数</Text>
            <Text style={styles.textInputTitle}>BitMex指数价格：{instrument.fairPrice}</Text>
            <Text style={styles.textInputTitle}>24小时交易量：{instrument.volume24h}</Text>
            <Text style={styles.textInputTitle}>未平仓合约数量：{instrument.openInterest}</Text>
            <Text style={styles.textInputTitle}>资金费率：{this.InstrumentState.instrument[66].fundingRate*100}% 1小时内</Text>
            <Text style={styles.textInputTitle}>合约价值：{this.InstrumentState.instrument[66].lotSize}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    bgView: {
        marginLeft: 20,
    },
    title: {
        color: 'white',
        fontSize: 15,
        marginTop: 20
    },
    priceText:{
        color: 'white',
        fontSize: 35,
        marginTop: 7,
        alignSelf: 'center',
    },
    textInputTitle: {
        color: 'white',
        fontSize: 15,
        marginTop: 7
    },
})

export default Panel3;