/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import *as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Navigation } from 'react-router-navigation';
import { NativeRouter, DeepLinking } from 'react-router-native';
import ReactNativeDialogContext from 'react-dialog-context-native'
import Home from './Home'

export default class App extends React.Component<any,any> {
  render() {
    return <ReactNativeDialogContext style={styles.container}>
      <NativeRouter>
        <Navigation hideNavBar navBarStyle={styles.navBar} titleStyle={styles.title}>
          <Card path="/" exact component={Home} title="Home"></Card>
        </Navigation>
      </NativeRouter>
    </ReactNativeDialogContext>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1
  },
  loading: {
    alignSelf: 'center',
  },
  navBar: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
  },
});
