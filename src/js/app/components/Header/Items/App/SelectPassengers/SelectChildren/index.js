import React, { PropTypes, Component } from 'react'
import { Modal, ScrollView, Platform, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../styles'


export default class SelectChildren extends Component {

  constructor(props){
    super(props)
  }

  static propTypes = {
    childrenNumber: PropTypes.number.isRequired,
    changeChildrenNumber: PropTypes.func.isRequired,
  }

  addChildren(){
    let number = this.props.childrenNumber + 1
    this.props.changeChildrenNumber(number)
  }

  minusChildren(){
    let number = this.props.childrenNumber - 1
    this.props.changeChildrenNumber(number)
  }

  render(){
    return(
      <View style={[common.row, common.justifyContent, common.spaceBetween, common.marginTop20]}>
        <TouchableOpacity onPress={this.addChildren.bind(this)}>
          <Icon name='add' type='MaterialIcons' iconStyle={common.padding10}/>
        </TouchableOpacity>
        <Text style={[common.box, common.textCenter, common.padding10, common.textMedium]}>{this.props.childrenNumber} </Text>
        <TouchableOpacity onPress={this.minusChildren.bind(this)}>
          <Icon name='minus' type='SimpleLineIcons' iconStyle={common.padding10}/>
        </TouchableOpacity>
      </View>
    )
  }
}
