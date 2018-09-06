import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity, Slider } from 'react-native'
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;

class Panel3 extends React.Component<any, any> {

    render() {
        return <View style={styles.bgView}>
            <Text style={styles.title}>合约明细</Text>

            <Text style={styles.priceText}>7999.00</Text>
            <Text style={styles.textInputTitle}>价格来源：BitMex指数</Text>
            <Text style={styles.textInputTitle}>BitMex指数价格：100000</Text>
            <Text style={styles.textInputTitle}>24小时交易量：100000000000</Text>
            <Text style={styles.textInputTitle}>未平仓合约数量：1000</Text>
            <Text style={styles.textInputTitle}>资金费率：1000</Text>
            <Text style={styles.textInputTitle}>合约价值：1000</Text>
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