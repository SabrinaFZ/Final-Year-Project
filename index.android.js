/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import App from './src/js/app'

export default class TrabajoFinDeGrado extends Component {
  render() {
    return (
      <App/>
    );
  }
}

// const TrabajoFinDeGrado = DrawerNavigator({
//     DrawerItem1: {
//         screen: Header,
//         navigationOptions: {
//             drawer: {
//                 label: 'Drawer 1',
//             },
//         },
//     },
// });

AppRegistry.registerComponent('TrabajoFinDeGrado', () => TrabajoFinDeGrado);
