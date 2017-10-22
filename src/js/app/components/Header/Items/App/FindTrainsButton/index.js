import React, { PropTypes, Component } from 'react'
import { ScrollView, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';

import common from './../../../../../../../styles'


export default class FindTrainsButton extends Component {
  constructor(props){
    super(props)

  }

  static propTypes = {
    isLoadingTrains: PropTypes.func.isRequired,
  }

  handleOnPress(){
    this.props.isLoadingTrains(true)
    this.props.navigation.navigate('SelectTicketTrain')
  }

  render(){
    return(
      <View style={[common.row, common.end,  common.marginTop50, common.marginBottom40]}>
        <TouchableOpacity style={[common.buttonNext]} onPress={this.handleOnPress.bind(this)} activeOpacity={0.8} >
          <Text style={common.textButtonNext}> {'FIND TRAINS'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
