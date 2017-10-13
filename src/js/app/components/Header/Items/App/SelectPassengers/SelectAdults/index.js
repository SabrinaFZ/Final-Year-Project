import React, { PropTypes, Component } from 'react'
import { Modal, ScrollView, Platform, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../styles'


export default class SelectAdults extends Component {

  constructor(props){
    super(props)
  }

  static propTypes = {
    adults: PropTypes.number.isRequired,
    changeAdultNumber: PropTypes.func.isRequired,
  }

  addAdult(){
    let number = this.props.adults + 1
    this.props.changeAdultNumber(number)
  }

  minusAdult(){
    let number = this.props.adults - 1
    this.props.changeAdultNumber(number)
  }

  render(){
    return(
      <View style={[common.row, common.justifyContent, common.spaceBetween, common.marginTop20]}>
        <TouchableOpacity onPress={this.addAdult.bind(this)}>
          <Icon name='add' type='MaterialIcons' iconStyle={common.padding10}/>
        </TouchableOpacity>
        <Text style={[common.box, common.textCenter, common.padding10, common.textMedium]}>{this.props.adults} </Text>
        <TouchableOpacity onPress={this.minusAdult.bind(this)}>
          <Icon name='minus' type='SimpleLineIcons' iconStyle={common.padding10}/>
        </TouchableOpacity>
      </View>
    )
  }
}
