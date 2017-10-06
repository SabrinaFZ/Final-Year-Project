import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'

import DrawerStack from './SideMenu/drawerStack'

const routeConfiguration = {
  DrawerStack: {
    screen: DrawerStack
  },
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'DrawerStack'
}


const CustomHeader =  StackNavigator(routeConfiguration, stackNavigatorConfiguration)

export default CustomHeader
