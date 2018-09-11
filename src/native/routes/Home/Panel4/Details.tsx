import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity, Slider } from 'react-native'
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;
import CoinLineChart from '../components/CoinLineChart'

type Props = {
    name: string,
}
class Details extends React.Component<Props, any> {

    render() {
        const { name } = this.props;
        var view = null
        if (name == '仓位[0]') {
            view = <View>
                <Text style={styles.textInputTitle}>合约</Text>
                <Text style={styles.textInputTitle}>目前仓位数量：100000</Text>
                <Text style={styles.textInputTitle}>价值：100000000000</Text>
                <Text style={styles.textInputTitle}>开仓价格：1000</Text>
                <Text style={styles.textInputTitle}>标记价格：1000</Text>
                <Text style={styles.textInputTitle}>强平价格：1000</Text>
                <Text style={styles.textInputTitle}>保证金：1000</Text>
                <Text style={styles.textInputTitle}>未实现盈亏(回报率%)：1000%</Text>
                <Text style={styles.textInputTitle}>已实现盈亏：1000</Text>
                <Text style={styles.textInputTitle}>平仓：1000</Text>
            </View>
        }
        return <View style={styles.bgView}>
        {view}
        </View>
    }
}

const styles = StyleSheet.create({
    bgView: {
        marginLeft: 20,
        paddingBottom: 30
    },
    title: {
        color: 'white',
        fontSize: 15,
        marginTop: 20,
        paddingBottom: 20
    },
    textInputTitle: {
        color: 'white',
        fontSize: 15,
        marginTop: 7
    },
})

export default Details;