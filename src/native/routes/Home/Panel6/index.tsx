import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity, Slider } from 'react-native'
import { observer } from 'mobx-react';
import BitmexService from '../../../../services/bitmex';
import { MarginState } from '../../../../stores/bitmex/subscribes';
import { di } from 'jsmodules';
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;

@observer
class Panel6 extends React.Component<any, any> {
    @di.Inject() bitmexService: BitmexService;
    @di.Inject() marginState: MarginState;

    state = {
        depositAddress: ""
    }

    async componentDidMount() {
        var response = await this.bitmexService.depositAddress();
        if (response.data) {
            this.setState({
                depositAddress: response.data
            })
        }
    }

    render() {
        var margin = this.marginState.margin.get("XBt")
        var z = 0, k = 0;
        if (margin) {
            z = margin.amount / Math.pow(10, 8);
            k = margin.availableMargin / Math.pow(10, 8);
        }
        console.log(this.state.depositAddress);
        return <View style={styles.bgView}>
            <Text style={styles.title}>总：{z}</Text>
            <Text style={styles.title}>可用：{k}</Text>

            <Text style={styles.title}>钱包地址</Text>
            <Text selectable={true}
                style={styles.title}>{this.state.depositAddress}</Text>

        </View>
    }
}

const styles = StyleSheet.create({
    bgView: {
        marginLeft: 20,
        paddingBottom: 30
    },
    title: {
        color: 'black',
        fontSize: 15,
        marginTop: 20,
        paddingBottom: 20
    },
})

export default Panel6;