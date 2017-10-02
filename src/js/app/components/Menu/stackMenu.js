import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator} from 'react-navigation'
import Login from './Login'
import SignUp from './SignUp'
import YourTickets from './YourTickets'
import Menu from './';
import StackApp from '../App/stackApp'
import CustomHeader from '../App/Header'

import { Icon } from 'react-native-elements'

const routeConfiguration = {
  Menu: {
    screen: Menu,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: <CustomHeader isApp={false} navigation={navigation} name='Login'/>,
    })
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: ({ navigation }) => ({
      header: <CustomHeader isApp={false} navigation={navigation} name='Register'/>,
    })
  },
  YourTickets: {
    screen: YourTickets,
    navigationOptions: ({ navigation }) => ({
      header: <CustomHeader isApp={false} navigation={navigation} name='Your Tickets'/>,
    })
  },
  StackApp : {
    screen: StackApp,
    navigationOptions: ({ navigation }) => ({
      header: <CustomHeader isApp={true} navigation={navigation} name='App'/>,
    })
  },
}

const stackNavigatorConfiguration = {
  headerMode: 'screen',
  initialRouteName: 'Menu'

}

const StackMenu = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackMenu;
