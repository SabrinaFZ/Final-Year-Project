import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator} from 'react-navigation'
import SelectOriginDestination from './SelectOriginDestination'
import SelectOriginDestinationContainer from './../../../../containers/SelectOriginDestination'
import SelectTicketTrain from './../App/SelectTicketTrain'

const routeConfiguration = {
  SelectOriginDestination : {
    screen : SelectOriginDestinationContainer
  },
  SelectTicketTrain: {
    screen: SelectTicketTrain
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'SelectOriginDestination'
}

const StackApp = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackApp;
