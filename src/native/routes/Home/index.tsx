import * as React from 'react';
import { ScrollView, Text, View } from 'react-native'
import Panel1 from './Panel1'
import Panel2 from './Panel2'
import Panel3 from './Panel3'
import Panel4 from './Panel4'
import Panel5 from './Panel5'
import Panel6 from './Panel6';

class Home extends React.Component<any, any> {
    state = {
        loading: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 5000);
    }

    render() {
        return <ScrollView
            keyboardShouldPersistTaps={true}
            style={{ backgroundColor: 'white' }}>
            <View style={{ marginTop: 30 }} />
            <Panel1 />
            <View style={{ backgroundColor: 'yellow', height: 1, width: '100%', marginTop: 20 }}></View>
            <Panel2 />
            <View style={{ backgroundColor: 'yellow', height: 1, width: '100%', marginTop: 20 }}></View>
            <Panel3 />
            <View style={{ backgroundColor: 'yellow', height: 1, width: '100%', marginTop: 20 }}></View>
            <Panel4 />
            <View style={{ backgroundColor: 'yellow', height: 1, width: '100%', marginTop: 20 }}></View>
            <Panel6 />
            <View style={{ backgroundColor: 'yellow', height: 1, width: '100%', marginTop: 20 }}></View>
            <Panel5 />
        </ScrollView>
    }
}

export default Home;