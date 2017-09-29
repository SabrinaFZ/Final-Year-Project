'use strict'

import { StackNavigator } from 'react-navigation'

// Screens
import ShoppingCart from './index'

const routeConfiguration = {
  ShoppingCart: { screen: ShoppingCart },
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'ShoppingCart'
}

export const NavigatorShoppingCart = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
