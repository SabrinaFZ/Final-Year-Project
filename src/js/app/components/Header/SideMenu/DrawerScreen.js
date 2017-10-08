import React, {Component} from 'react'
import { DrawerNavigator } from 'react-navigation'

import MySettings from './../Items/Settings/'
import StackApp from './../Items/App/stackApp'
//import SelectOriginDestination from './../../App/SelectOriginDestination'

const routeConfiguration = {
  App: {
    screen: StackApp
  },
  Settings: {
    screen: MySettings,
  },
}

const drawerNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'App'

}

const DrawerScreen = DrawerNavigator(routeConfiguration, drawerNavigatorConfiguration)

export default DrawerScreen
