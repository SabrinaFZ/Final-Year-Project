import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import ButtonSideMenu from './../Buttons/ButtonSideMenu'
import ShoppingCartButton from './../Buttons/ShoppingCartButton'
import GoBackButtonContainer from './../../../containers/GoBackButton'

import DrawerScreen from './DrawerScreen'
import ShoppingCartContainer from './../../../containers/ShoppingCart'

const routeConfiguration = {
  DrawerScreen: {
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
      },
      headerTintColor: 'white',
      headerStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#e9418b',
      },
      headerLeft: <Icon name='arrow-left' type='entypo' size={30} color='#fff' underlayColor= '#e9418b'
          onPress={() => navigation.goBack() }
        />,
      headerRight: <Icon name='home' type='entypo' size={30} color='#fff' underlayColor= '#e9418b'
        onPress={() => navigation.navigate('App') }/>
    })
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'float',

}

const DrawerStack = StackNavigator(routeConfiguration, stackNavigatorConfiguration)

export default DrawerStack
