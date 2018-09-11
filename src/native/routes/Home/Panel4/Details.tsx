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
        if (name == '仓位') {
            var arr = [['','1000','10000','9999','8888','90000','1000000','35%','1000','23000'],['','1000','10000','9999','8888','90000','1000000','35%','1000','23000']];
            view = <View>
                <Text style={styles.textInputTitle}>合约  目前仓位数量  价值  开仓价格  标记价格  强平价格  保证金  未实现盈亏(回报率%)  已实现盈亏  平仓</Text>
                {arr.map(name => <View >
                    <Text style={styles.textInputTitle}>{name}</Text>
                </View>)}
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