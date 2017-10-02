'use strict'
import { TabNavigator } from 'react-navigation'
// Tab-Navigators
import SelectOriginDestination from '../../SelectOriginDestination'

const routeConfiguration = {
  SelectOriginDestination: {
    screen: SelectOriginDestination
  },
}

const tabBarConfiguration = {
  tabBarOptions:{
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
    activeBackgroundColor: 'blue',
    inactiveBackgroundColor: 'white',
  }
}

export const SubHeader = TabNavigator(routeConfiguration,tabBarConfiguration)
