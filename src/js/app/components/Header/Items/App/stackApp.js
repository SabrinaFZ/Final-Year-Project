import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator} from 'react-navigation'
import SelectOriginDestination from './SelectOriginDestination'
import SelectOriginDestinationContainer from './../../../../containers/SelectOriginDestination'
import SelectTicketTrainContainer from './../../../../containers/SelectTicketTrain'
import SelectTicketTrainReturnContainer from './../../../../containers/SelectTicketTrain/SelectTicketTrainReturn'
import SelectTicketTrainOutwardContainer from './../../../../containers/SelectTicketTrain/SelectTicketTrainOutward'
import DetailsTicketsContainer from './../../../../containers/DetailsTickets'
import MapContainer from './../../../../containers/Map'
import SearchMapContainer from './../../../../containers/SearchMap/'

const routeConfiguration = {
  SelectOriginDestination : {
    screen : SelectOriginDestinationContainer
  },
  SelectTicketTrain: {
    screen: SelectTicketTrainContainer
  },
  SelectTicketTrainOutward: {
    screen: SelectTicketTrainOutwardContainer,
  },
  SelectTicketTrainReturn: {
    screen: SelectTicketTrainReturnContainer,
  },
  DetailsTickets: {
    screen: DetailsTicketsContainer
  },
  SearchMap: {
    screen: SearchMapContainer
  },
  Map: {
    screen: MapContainer
  },
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'SelectOriginDestination'
}

const StackApp = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackApp;
