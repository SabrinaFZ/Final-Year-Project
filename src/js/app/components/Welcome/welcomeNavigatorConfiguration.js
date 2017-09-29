'use strict'

import { StackNavigator } from 'react-navigation'

// Screens
import Welcome from './index'
import ShoppingCart from '../App/ShoppingCart/'

const routeConfiguration = {
  Welcome: { screen: Welcome },
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Welcome'
}

export const NavigatorWelcome = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
