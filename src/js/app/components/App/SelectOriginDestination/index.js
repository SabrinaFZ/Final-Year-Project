'use strict'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class SelectOriginDestination extends React.Component {
  render(){
    return(
      <View style={{
        flex:1,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Text>{ 'Select Origin & Destination' }</Text>

      </View>
    )
  }
}
