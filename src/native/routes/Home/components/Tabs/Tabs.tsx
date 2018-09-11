import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TabPanel } from './TabPanel';
import { nextId } from 'jsmodules/lib/system';

type Props = {
    defaultSelectedTab?: string,
    mode: "Top" | "Bottom",
    itemStyle?: any
    selectedItemStyle?: any,
    itemTextStyle?: any,
    selectedItemTextStyle?: any,
    showLine?: boolean
}

export class Tabs extends React.Component<Props>{

    state = {
        selectedTab: null
    }

    haneleSelect = (selectedTab) => {
        this.setState({
            selectedTab
        })
    }

    render() {
        var { children, mode, defaultSelectedTab } = this.props;
        var tabItems = [];
        var tabs = children as TabPanel[];
        var selectedTab = this.state.selectedTab || defaultSelectedTab;
        if (!selectedTab && tabs.length != 0) {
            selectedTab = tabs[0].props.name;
        }
        var viewTabs = {};
        for (let tab of tabs) {
            let name = tab.props.name
            viewTabs[name] = tab;
            let itemStyle = [this.props.itemStyle];
            let itemTextStyle = [this.props.itemTextStyle];
            if (selectedTab == name) {
                itemStyle.push(this.props.selectedItemStyle);
                itemTextStyle.push(this.props.selectedItemTextStyle);
            }
            let component = (<TouchableOpacity style={itemStyle} key={name + "-" + nextId()} onPress={() => { this.haneleSelect(name) }}>
                <Text style={itemTextStyle}>{name}</Text>
            </TouchableOpacity>)
            tabItems.push(component)
        }

        if (this.props.showLine) {
            tabItems.unshift(<View key={'leftLine'} style={styles.bgTopLineView} />)
            tabItems.push(<View key={'rightLine'} style={styles.bgTopLineView} />)
        }

        let tabItemsComponent = <View style={styles.bgCoinNameView}>{tabItems}</View>;
        return (<View style={{ flex: 1 }}>
            {
                mode == "Top" && (tabItemsComponent)
            }
            {viewTabs[selectedTab]}
            {
                mode == "Bottom" && (tabItemsComponent)
            }
        </View>)
    }
}

const styles = StyleSheet.create({
    topLineView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgCoinNameView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgTopLineView: {
        flex: 1,
        height: 0.0,
        backgroundColor: '#6555fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
});