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
    if(this.props.childrenNumber > 0){
      let number = this.props.childrenNumber - 1
      this.props.changeChildrenNumber(number)
    }
  }

  render(){
    return(
      <View style={[common.row, common.justifyContent, common.spaceBetween, common.marginTop20]}>
        <TouchableOpacity onPress={this.addChildren.bind(this)}>
          <Icon name='add' type='MaterialIcons' iconStyle={common.padding10}/>
        </TouchableOpacity>
        <View style={[common.center, common.padding10]}>
          <Text style={common.textBold}> {this.props.childrenNumber} </Text>
        </View>
        <TouchableOpacity onPress={this.minusChildren.bind(this)}>
          <Text style={[common.padding10, common.textLarge]}> - </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
