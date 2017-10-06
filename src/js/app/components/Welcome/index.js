'use strict'
import React from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import common from '../../../../styles'
import BackPageComponent from '../BackComponent'

import Spinner from 'react-native-spinkit'

export default class Welcome extends React.Component {
  constructor(props){
    super()
    this.state = {
      isVisible: false,
      size: 100,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isVisible: !this.state.isVisible
      })
    }, 500)

    setTimeout(() => {
      //this.props.navigation.navigate('Menu')
      this.props.navigation.navigate('CustomHeader')
      //this.props.navigation.navigate('App')
    }, 1000)
  }



  render(){
    return(
      <View style={common.container}>
        <Text style={common.text}>{ 'Loading...' }</Text>
        <Spinner style={common.spinner} type='Circle' isVisible={this.state.isVisible} size={this.state.size} />
      </View>
    )
  }
}
