import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator} from 'react-navigation'
//import Welcome from './components/Welcome';
//import StackMenu from './components/Menu/stackMenu';
//import StackApp from './components/App/stackApp'
import CustomHeader from './components/Header/'

import LoadingContainer from './containers/Loading'

const routeConfiguration = {
  Loading: {
    screen: LoadingContainer,
    navigationOptions: {
      header: null
    }
  },
  CustomHeader:{
    screen: CustomHeader
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Loading'
}

const StackNav = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackNav;
