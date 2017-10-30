import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'

import ButtonSideMenu from './../Buttons/ButtonSideMenu'
import ShoppingCartButton from './../Buttons/ShoppingCartButton'
import GoBackButtonContainer from './../../../containers/GoBackButton'

import DrawerScreen from './DrawerScreen'
import ShoppingCartContainer from './../../../containers/ShoppingCart'

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
    screen: ShoppingCartContainer,
    navigationOptions:  ({navigation}) => ({
      headerTitle: 'Shopping Cart',
      headerTitleStyle: {
        alignSelf: 'center',
        paddingRight: 40
      },
      headerTintColor: 'white',
      headerStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#e9418b',
      },
      headerLeft: <GoBackButtonContainer navigation={navigation}/>,
    })
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'float',

}

const DrawerStack = StackNavigator(routeConfiguration, stackNavigatorConfiguration)

export default DrawerStack
