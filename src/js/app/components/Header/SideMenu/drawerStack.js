import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import ButtonSideMenu from './../Buttons/ButtonSideMenu'
import ShoppingCartButton from './../Buttons/ShoppingCartButton'

import DrawerScreen from './DrawerScreen'
import ShoppingCartContainer from './../../../containers/ShoppingCart'
import GoHomeContainer from './../../../containers/GoHome'

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
    transitionConfig: () => ({
     transitionSpec: {
       duration: 300,
       easing: Easing.out(Easing.poly(4)),
       timing: Animated.timing,
     },
   }),
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
      headerRight: <GoHomeContainer navigation={navigation}/>
    })
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'float',

}

const DrawerStack = StackNavigator(routeConfiguration, stackNavigatorConfiguration)

export default DrawerStack
