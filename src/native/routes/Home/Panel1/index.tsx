import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;

class Panel1 extends React.Component<any, any> {

    onChangeText = (text) => {
        console.log('输入仓位：', text);
    }

    render() {
        return <View style={styles.bgView}>
            <Text style={styles.title}>买卖</Text>
            <View style={styles.bgTextInputView}>
                <Text style={styles.textInputTitle}>仓位</Text>
                <TextInput
                    onChangeText={this.onChangeText}
                    autoFocus={true}
                    returnKeyType="done"
                    placeholder={''}
                    autoCorrect={false}
                    placeholderTextColor="black"
                    style={styles.textInput}>
                </TextInput>
            </View>
            <View style={styles.bgTextInputView}>
                <Text style={styles.textInputTitle}>限价</Text>
                <TextInput
                    onChangeText={this.onChangeText}
                    autoFocus={true}
                    returnKeyType="done"
                    placeholder={''}
                    autoCorrect={false}
                    placeholderTextColor="black"
                    style={styles.textInput}>
                </TextInput>
            </View>

            <View style={styles.bgTextInputView}>
                <View>
                    <TouchableOpacity style={styles.touchable1}>
                        <Text style={styles.touchableText}>做多</Text>
                    </TouchableOpacity>
                    <Text style={styles.touchableText}>成本：0.00001</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.touchable2}>
                        <Text style={styles.touchableText}>做空</Text>
                    </TouchableOpacity>
                    <Text style={styles.touchableText1}>成本：0.00001</Text>
                </View>
            </View>
            <Text style={styles.textInputTitle}>委托价值：0.00001XBT</Text>
            <Text style={styles.textInputTitle}>可用余额：0.00001XBT</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    bgView: {
        marginLeft: 20
    },
    title: {
        color: 'white',
        fontSize: 15,
        marginTop: 20
    },
    bgTextInputView: {
        flexDirection: 'row',
        marginTop: 15,
    },
    textInputTitle: {
        color: 'white',
        fontSize: 15,
        marginTop: 7
    },
    textInput: {
        backgroundColor: 'white',
        width: '80%',
        marginLeft: 15,
        fontSize: 25,
        borderRadius: 5,
    },
    touchable1: {
        backgroundColor: 'white',
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    touchable2: {
        backgroundColor: 'white',
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: '50%',
    },
    touchableText: {
        backgroundColor: '#00000000',
    },
    touchableText1: {
        backgroundColor: '#00000000',
        marginLeft: '50%',
    }
})

export default Panel1;