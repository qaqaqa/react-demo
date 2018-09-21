import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { di } from 'jsmodules';
import BitmexService from '../../../../services/bitmex';
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;

class Panel1 extends React.Component<any, any> {
    @di.Inject() bitmexService: BitmexService;

    getInputValue = () => {
        var input1: any = this.refs.input1;
        var input2: any = this.refs.input2;
        console.log(input1._lastNativeText)
        return {
            qty: input1._lastNativeText,
            price: input2._lastNativeText
        };
    };

    handleBuy = async () => {
        try {
            var info = this.getInputValue();
            await this.bitmexService.buyLimit(info.price, info.qty);
        } catch (ex) {
            if (ex.response && ex.response.data) {
                var res = ex.response.data;
                alert(res.error.message);
            } else {
                throw ex;
            }
        }
    };

    handleSell = () => {
        try {
            var info = this.getInputValue();
            this.bitmexService.sellLimit(info.price, info.qty);
        } catch (ex) {
            if (ex.response && ex.response.data) {
                var res = ex.response.data;
                alert(res.error.message);
            } else {
                throw ex;
            }
        }
    };

    render() {
        return <View style={styles.bgView}>
            <Text style={styles.title}>总：0.000XBT</Text>
            <Text style={styles.title}>可用：0.000XBT</Text>
            <Text style={styles.title}>买卖</Text>
            <View style={styles.bgTextInputView}>
                <Text style={styles.textInputTitle}>仓位</Text>
                <TextInput
                    ref='input1'
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
                    ref='input2'
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
                    <TouchableOpacity style={styles.touchable1} onPress={this.handleBuy}>
                        <Text style={styles.touchableText1}>做多</Text>
                    </TouchableOpacity>
                    <Text style={styles.touchableText1}>成本：0.00001</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.touchable2} onPress={this.handleSell}>
                        <Text style={styles.touchableText1}>做空</Text>
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
    touchableText1: {
        backgroundColor: 'transparent',
    },
    touchableText2: {
        backgroundColor: '#00000000',
        marginLeft: '50%',
    }
})

export default Panel1;