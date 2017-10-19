import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator} from 'react-navigation'
import SelectOriginDestination from './SelectOriginDestination'
import SelectOriginDestinationContainer from './../../../../containers/SelectOriginDestination'
import SelectTicketTrainContainer from './../../../../containers/SelectTicketTrain'

const routeConfiguration = {
  SelectOriginDestination : {
    screen : SelectOriginDestinationContainer
  },
  SelectTicketTrain: {
    screen: SelectTicketTrainContainer
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'SelectOriginDestination'
}

const StackApp = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackApp;
