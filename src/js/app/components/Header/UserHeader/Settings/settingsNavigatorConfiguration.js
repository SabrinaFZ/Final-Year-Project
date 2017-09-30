'use strict'

import { StackNavigator } from 'react-navigation'

// Screens
import Settings from './index'

const routeConfiguration = {
  Settings: { screen: Settings },
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Settings'
}

export const NavigatorSettings = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
