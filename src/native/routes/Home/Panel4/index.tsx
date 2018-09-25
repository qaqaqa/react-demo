import * as React from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity, Slider } from 'react-native'
import { Tabs, TabPanel } from '../components/Tabs';
import Details from './Details';
var Dimensions = require('Dimensions');
const width = Dimensions.get("window").width;
class Panel4 extends React.Component<any, any> {

    render() {
        var arr = ['仓位', '已平仓仓位', '活动委托', '止损委托', '已成交', '委托历史'];
        return <View style={styles.bgView}>

            <Tabs mode="Top" showLine itemStyle={styles.overvalLink} selectedItemStyle={styles.overvalLinkSelected} itemTextStyle={styles.overvalText}>
                {
                    arr.map(name => <TabPanel name={name} key={name}>
                        <Details name={name} />
                    </TabPanel>)
                }
            </Tabs>

        </View>
    }
}

const margin = 2;
const styles = StyleSheet.create({
    bgView: {
        marginTop:20
    },
    title: {
        color: 'black',
        fontSize: 15,
        marginTop: 20
    },
    textInputTitle: {
        color: 'black',
        fontSize: 15,
        marginTop: 7
    },
    overvalLink: {
        marginLeft: margin,
        marginRight: margin,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overvalLinkSelected: {
        marginLeft: margin,
        marginRight: margin,
        backgroundColor: 'red',
        borderRadius: 15,
    },
    overvalText: {
        paddingLeft: 2,
        paddingRight: 2,
        fontSize: 14,
        color: '#6555fa',
        backgroundColor: 'transparent'
    },
})

export default Panel4;