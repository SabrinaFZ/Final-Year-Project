import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator} from 'react-navigation'
import TopHeader from '../TopHeader/'

const routeConfiguration = {
  TopHeader : {
    screen : TopHeader
  },
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'TopHeader'
}

const StackTopHeader = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

export default StackTopHeader;
