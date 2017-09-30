'use strict'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
export default class Menu extends React.Component {
  render(){
    return(
      <View style={{
        flex:1,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Text>{ 'Welcome' }</Text>
        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate('Menu') }
          style={{
            padding:20,
            borderRadius:20,
            backgroundColor:'yellow',
            marginTop:20
          }}>
          <Text>{'Go to next screen this tab'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
