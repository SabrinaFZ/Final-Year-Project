import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'

import ButtonSideMenu from './../Buttons/ButtonSideMenu'
import ShoppingCartButton from './../Buttons/ShoppingCartButton'

import DrawerScreen from './DrawerScreen'
import ShoppingCart from './../Items/ShoppingCart'

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
      headerTitle: 'Shopping Cart',
      headerTitleStyle: {
        alignSelf: 'center',
        paddingRight: 40
      },
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
