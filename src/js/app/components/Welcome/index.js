'use strict'
import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import welcome from '../../../../styles/Welcome'
import common from '../../../../styles'

import Spinner from 'react-native-spinkit'

export default class Welcome extends React.Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    showHideWelcome: PropTypes.func.isRequired
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.showHideWelcome(this.props.isVisible)
    }, 500)

    setTimeout(() => {
      //this.props.navigation.navigate('Menu')
      this.props.navigation.navigate('CustomHeader')
      //this.props.navigation.navigate('App')
    }, 1000)
  }



  render(){
    return(
      <View style={[common.container, common.center]}>
        <Text style={welcome.textWelcome}>{ 'Loading...' }</Text>
        <Spinner style={welcome.spinner} type='Circle' isVisible={this.props.isVisible} size={100} />
      </View>
    )
  }
}
