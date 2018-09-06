import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity, Slider } from 'react-native'
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;

class Panel2 extends React.Component<any, any> {

    state = {
        value: 1,
    }

    onSlidingComplete = (text) => {
        console.log('滑动杠杆结束：', Math.round(text));
    }
    onValueChange = (text) => {
        console.log('滑动杠杆过程：', Math.round(text));
        this.setState({
            value: Math.round(text),
        });
    }

    render() {
        return <View style={styles.bgView}>
            <Text style={styles.title}>持有仓位：XBTUSD</Text>

            <Text style={styles.textInputTitle}>合约数：100000</Text>
            <Text style={styles.textInputTitle}>开仓价格：100000</Text>
            <Text style={styles.textInputTitle}>回报率：100%</Text>
            <Text style={styles.textInputTitle}>强平价格：100000</Text>
            <Text style={styles.textInputTitle}>杠杆</Text>
            <Text style={{marginTop:10,fontSize:25,color:'red',marginLeft:this.state.value*width*0.8/100-this.state.value/2}}>{this.state.value}</Text>
            <Slider style={styles.slider}
            maximumValue={100}
            minimumValue={1}
            onSlidingComplete={this.onSlidingComplete}
            onValueChange={this.onValueChange}
            />
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
    textInputTitle: {
        color: 'white',
        fontSize: 15,
        marginTop: 7
    },
    slider:{
        width:'80%'
    }
})

export default Panel2;