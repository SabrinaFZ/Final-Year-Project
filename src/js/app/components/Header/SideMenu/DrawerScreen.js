import React, {Component} from 'react'
import { DrawerNavigator } from 'react-navigation'

import Settings from './../../Settings/'
import StackApp from './../../App/stackApp'

const routeConfiguration = {
  App: {
    screen: StackApp
  },
  Settings: {
    screen: Settings,
  },
}

const drawerNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'App'

}

const DrawerScreen = DrawerNavigator(routeConfiguration, drawerNavigatorConfiguration)

export default DrawerScreen
