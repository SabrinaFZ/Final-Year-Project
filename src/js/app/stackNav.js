import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator} from 'react-navigation'
import Welcome from './components/Welcome';
import StackMenu from './components/Menu/stackMenu';


const routeConfiguration = {
  Welcome: {
      screen: Welcome,
  },
  Menu: {
      screen: StackMenu,
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Welcome'
}

const StackNav = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackNav;
