import * as React from 'react';
import {View,Text} from 'react-native';

export type TabPanelProps={
    key?:string
    name:string
    style?:any
}

export class TabPanel extends React.Component<TabPanelProps>{

    name;
    constructor(props){
        super(props);
        this.name=props.name
    }
    render(){
        return <View style={this.props.style}>
            {this.props.children}
        </View>
    }

}