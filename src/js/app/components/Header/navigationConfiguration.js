'use strict'

import { TabNavigator } from 'react-navigation'
import { StackNavigator } from 'react-navigation'
// Tab-Navigators
import UserHeaderNavigation from './UserHeader/'
import HeaderNavigation from './Header'
import StackHeaderNavigation from './StackNavigationHeader'
import StackUserHeaderNavigation from './StackNavigationUserHeader'

const routeConfiguration = {
  TabHeader: { screen: HeaderNavigation },
  //TabHeader: { screen: StackHeaderNavigation },
  //TabUserHeader : { screen: UserHeaderNavigation },
  //TabUserHeader: { screen: StackUserHeaderNavigation },
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
//     swipeEnabled: false,
//     animationEnabled: false,
//   }
// }


// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'TabHeader'
  //initialRouteName: 'TabUserHeader'
}

// export const navigatorReducer = (state,action) => {
//   if (action.type === 'JUMP_TO_TAB') {
//     return { ...state, index:0 }
//   } else {
//     return NavigatorRouter.router.getStateForAction(action,state)
//   }
// }

//export const NavigatorRouter = TabNavigator(routeConfiguration,tabBarConfiguration)
export const NavigatorRouter = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
