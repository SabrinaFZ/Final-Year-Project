import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator} from 'react-navigation'
import Welcome from './components/Welcome';
//import StackMenu from './components/Menu/stackMenu';
//import StackApp from './components/App/stackApp'
import CustomHeader from './components/Header/'

const routeConfiguration = {
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null
    }
  },
  // App: {
  //   screen: StackApp,
  //   navigationOptions: ({ navigation }) => ({
  //     headerTitle: 'App',
  //     header: <CustomHeader />,
  //     headerStyle: {backgroundColor: '#e9418b'}
  //   })
  // },
  CustomHeader:{
    screen: CustomHeader
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Welcome'
}

const StackNav = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackNav;
