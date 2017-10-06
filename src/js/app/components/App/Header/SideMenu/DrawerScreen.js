import React, {Component} from 'react'
import { DrawerNavigator } from 'react-navigation'

import MySettings from './MySettings'
import StackApp from '../../stackApp'
import SelectOriginDestination from './../../SelectOriginDestination'

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
