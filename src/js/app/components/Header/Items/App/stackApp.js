import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator} from 'react-navigation'
import SelectOriginDestination from './SelectOriginDestination'
import SelectOriginDestinationContainer from './../../../../containers/SelectOriginDestination'
import SelectTicketTrainContainer from './../../../../containers/SelectTicketTrain'
import DetailsTicketsContainer from './../../../../containers/DetailsTickets'

const routeConfiguration = {
  SelectOriginDestination : {
    screen : SelectOriginDestinationContainer
  },
  SelectTicketTrain: {
    screen: SelectTicketTrainContainer
  },
  DetailsTickets: {
    screen: DetailsTicketsContainer
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'SelectOriginDestination'
}

const StackApp = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackApp;
