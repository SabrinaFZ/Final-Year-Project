'use strict'

import { StackNavigator } from 'react-navigation'

// Screens
import Menu from '../Menu'

const routeConfiguration = {
  Menu: { screen: Menu }
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Menu'
}

export const NavigatorMenu = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
