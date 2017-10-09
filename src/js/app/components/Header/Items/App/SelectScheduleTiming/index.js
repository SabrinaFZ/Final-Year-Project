import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../styles'

import ModalScheduleTiming from './Modal/'

export default class SelectScheduleTiming extends Component {
  constructor(props){
    super(props)

    this.state = {
      openOutward: false,
      openReturn:false,
      addReturn: false,
    }
  }

  static propTypes = {

  }

  openOutward(){
    this.setState({openOutward: !this.state.openOutward, openReturn: false})
  }

  openReturn(){
    this.setState({openReturn: !this.state.openReturn, openOutward: false, addReturn: true})
  }

  cancelReturn(){
    this.setState({openReturn: !this.state.openReturn, openOutward: false, addReturn: false})
  }

  renderOpenSchedule(){
    if(this.state.openOutward){
      var title = 'OUTWARD'
      var handleRequestClose = this.openOutward.bind(this)
    }
    else if(this.state.openReturn){
      var title = 'RETURN'
      var handleRequestClose = this.openReturn.bind(this)
      var handleCancelReturn = this.cancelReturn.bind(this)
    }
    else{
      return null
    }
    return (
      <ModalScheduleTiming title={title} handleRequestClose={handleRequestClose} handleCancelReturn={handleCancelReturn}/>
    )
  }


  render(){
    if(!this.state.addReturn){
      var returnButton =
        <TouchableOpacity style={[common.buttonDisabled, common.marginTop20]} activeOpacity={0.8} onPress={this.openReturn.bind(this)}>
          <Text style={common.textButton}> { 'ADD RETURN' }</Text>
        </TouchableOpacity>
    }else if(this.state.addReturn){
      var returnButton =
        <TouchableOpacity style={[common.buttonActive, common.marginTop20]} activeOpacity={0.8} onPress={this.openReturn.bind(this)}>
          <Text style={common.textButton}> { 'RETURN' }</Text>
        </TouchableOpacity>
    }

    return(
      <View>
        <View style={[common.row, common.spaceBetween]}>
          <TouchableOpacity style={[common.buttonActive, common.marginTop20]} activeOpacity={0.8} onPress={this.openOutward.bind(this)}>
            <Text style={common.textButton}> { 'OUTWARD' }</Text>
          </TouchableOpacity>
          {returnButton}
        </View>
        { this.renderOpenSchedule() }
      </View>
    )
  }
}
