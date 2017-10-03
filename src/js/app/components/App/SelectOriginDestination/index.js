'use strict'
import React from 'react'
import { BackHandler, View, Text, TouchableOpacity } from 'react-native'

export default class SelectOriginDestination extends React.Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this._BackAndroid.bind(this));
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress',this._BackAndroid.bind(this));
  }

  _BackAndroid=()=>{
   this.props.navigation.goBack();
   return false
  }

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
