import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator} from 'react-navigation'
import SelectOriginDestination from './SelectOriginDestination'


const routeConfiguration = {
  SelectOriginDestination : {
    screen : SelectOriginDestination
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'SelectOriginDestination'
}

const StackApp = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackApp;
