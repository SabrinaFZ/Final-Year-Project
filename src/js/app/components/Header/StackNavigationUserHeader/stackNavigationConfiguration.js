'use strict'

import { TabNavigator } from 'react-navigation'
import { StackNavigator } from 'react-navigation'
// Tab-Navigators
import UserHeaderNavigation from '../UserHeader'

const routeConfiguration = {
  TabUserHeader: { screen: UserHeaderNavigation },
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
  initialRouteName: 'TabUserHeader'
}

//export const NavigatorRouter = TabNavigator(routeConfiguration,tabBarConfiguration)
export const NavigatorStackUserHeader = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
