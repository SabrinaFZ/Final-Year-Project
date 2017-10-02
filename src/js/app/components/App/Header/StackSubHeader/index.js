import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator} from 'react-navigation'
import SubHeader from '../SubHeader'

const routeConfiguration = {
  SubHeader: {
    screen : SubHeader
  }
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'SubHeader'
}

const StackSubHeader = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackSubHeader;
