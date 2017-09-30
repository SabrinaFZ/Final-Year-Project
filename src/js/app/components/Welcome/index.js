'use strict'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
export default class Welcome extends React.Component {
  render(){
    return(
      <View style={{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Text>{ 'Welcome' }</Text>
        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate('Menu') }
          style={{
            padding:20,
            borderRadius:20,
            backgroundColor:'blue',
            marginTop:20
          }}>
          <Text>{'Go to next screen this tab'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
