import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'

import ButtonSideMenu from './ButtonSideMenu'
import ShoppingCartButton from './ShoppingCartButton'

import DrawerScreen from './DrawerScreen'
import ShoppingCart from './../../ShoppingCart'

const routeConfiguration = {
  DrawerSreen: {
    screen: DrawerScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'App',
      headerTitleStyle: {
        color: 'white',
        alignSelf: 'center'
      },
      headerLeft: <ButtonSideMenu navigation={navigation}/>,
      headerRight:  <ShoppingCartButton navigation={navigation}/>,
      headerStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#e9418b'
      }
    })
  },
  ShoppingCart:{
    screen: ShoppingCart,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#e9418b',
      }
    }
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'float',

}

const DrawerStack = StackNavigator(routeConfiguration, stackNavigatorConfiguration)

export default DrawerStack
