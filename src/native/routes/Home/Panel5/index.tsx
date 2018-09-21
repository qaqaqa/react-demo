import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity, Slider } from 'react-native'
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;
import CoinLineChart from '../components/CoinLineChart'

class Panel5 extends React.Component<any, any> {

    render() {
        return <View style={styles.bgView}>
            <Text style={styles.title}>图表</Text>

            <CoinLineChart />
        </View>
    }
}

const styles = StyleSheet.create({
    bgView: {
        marginLeft: 20,
        paddingBottom:30
    },
    title: {
        color: 'black',
        fontSize: 15,
        marginTop: 20,
        paddingBottom:20
    },
})

export default Panel5;