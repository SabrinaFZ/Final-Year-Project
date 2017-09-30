'use strict'

import { TabNavigator } from 'react-navigation'
import { StackNavigator } from 'react-navigation'
// Tab-Navigators
import HeaderNavigation from '../Header'
import WelcomeNavigation from '../../Welcome/WelcomeTabConfiguration'
import ShoppingCartNavigation from '../../App/ShoppingCart/ShoppingCartTabConfiguration'

const routeConfiguration = {
  TabHeader: { screen: HeaderNavigation },
}
// const tabBarConfiguration = {
//   //...other configs
//   tabBarOptions:{
//     // tint color is passed to text and icons (if enabled) on the tab bar
//     activeTintColor: 'white',
//     inactiveTintColor: 'blue',
//   // background color is for the tab component
//     activeBackgroundColor: 'blue',
//     inactiveBackgroundColor: 'white',
//     indicatorStyle: {
//       backgroundColor: 'white',
//     },
//   }
// }


// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'TabHeader'
}

//export const NavigatorRouter = TabNavigator(routeConfiguration,tabBarConfiguration)
export const NavigatorStackHeader = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
