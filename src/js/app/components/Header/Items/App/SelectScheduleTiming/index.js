import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../styles'

import ModalScheduleTimingContainer from './../../../../../containers/SelectScheduleTiming/ModalContainer'

export default class SelectScheduleTiming extends Component {
  constructor(props){
    super(props)

    this.getModalProps = this.getModalProps.bind(this)
    this.renderOpenSchedule = this.renderOpenSchedule.bind(this)
  }

  static propTypes = {
    openOutward: PropTypes.bool.isRequired,
    openReturn: PropTypes.bool.isRequired,
    cancelReturn: PropTypes.bool.isRequired,
    openOutwardModal: PropTypes.func.isRequired,
    openReturnModal: PropTypes.func.isRequired,
    cancelReturn: PropTypes.func.isRequired,
  }

  getModalProps = () => {
    if(this.props.openOutward){
      return {
        title: 'OUTWARD',
        //handleRequestClose: this.props.openOutwardModal(this.props.openOutward)
      }
    }
    if(this.props.openReturn){
      return {
        title: 'RETURN',
        // handleRequestClose: this.props.openReturnModal(this.props.openReturn),
        // handleCancelReturn: this.props.cancelReturn(this.props.cancelReturn),
      }
    }
  }

  renderOpenSchedule(){
    if(this.props.openOutward || this.props.openReturn){
      var modalProps = this.getModalProps()
      return (
        <ModalScheduleTimingContainer title={modalProps.title} />
      )
    }else{
      return null
    }

  }

  render(){
    if(!this.props.addReturn){
      var returnButton =
        <TouchableOpacity style={[common.buttonDisabled, common.marginTop20]} activeOpacity={0.8} onPress={() => this.props.openReturnModal(this.props.openReturn)}>
          <Text style={common.textButton}> { 'ADD RETURN' }</Text>
        </TouchableOpacity>
    }else if(this.props.addReturn){
      var returnButton =
        <TouchableOpacity style={[common.buttonActive, common.marginTop20]} activeOpacity={0.8} onPress={() => this.props.openReturnModal(this.props.openReturn)}>
          <Text style={common.textButton}> { 'RETURN' }</Text>
        </TouchableOpacity>
    }

    return(
      <View>
        <View style={[common.row, common.spaceBetween]}>
          <TouchableOpacity style={[common.buttonActive, common.marginTop20]} activeOpacity={0.8} onPress={() => this.props.openOutwardModal(this.props.openOutward)}>
            <Text style={common.textButton}> { 'OUTWARD' }</Text>
          </TouchableOpacity>
          {returnButton}
        </View>
        { this.renderOpenSchedule()}
      </View>
    )
  }
}
