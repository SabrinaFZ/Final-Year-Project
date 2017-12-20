import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

//Buttons
import SideMenu from './../Buttons/SideMenu'
import ShoppingCart from './../Buttons/ShoppingCart'

import DrawerScreen from './DrawerScreen'
import ShoppingCartContainer from './../../../containers/ShoppingCart'
import HomeContainer from './../../../containers/Home'

const routeConfiguration = {
  DrawerScreen: {
    screen: DrawerScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'App',
      headerTitleStyle: {
        color: 'white',
        alignSelf: 'center'
      },
      headerLeft: <SideMenu navigation={navigation}/>,
      headerRight:  <ShoppingCart navigation={navigation}/>,
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
      headerRight: <HomeContainer navigation={navigation}/>
    })
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'float',

}

const DrawerStack = StackNavigator(routeConfiguration, stackNavigatorConfiguration)

export default DrawerStack
