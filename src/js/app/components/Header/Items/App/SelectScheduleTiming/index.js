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
    outward: PropTypes.object.isRequired,
    return: PropTypes.object.isRequired,
    addReturn: PropTypes.bool.isRequired,
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

  handleCancelReturn(){
    this.props.cancelReturn(this.props.addReturn)
  }

  render(){
    if(!this.props.addReturn){
      var returnButton =
        <TouchableOpacity style={[common.buttonDisabled, common.marginTop10, common.center]} activeOpacity={0.8} onPress={() => this.props.openReturnModal(this.props.openReturn)}>
          <Text style={common.textButton}> { 'ADD RETURN' }</Text>
        </TouchableOpacity>
    }else if(this.props.addReturn){
      var returnButton =
      <TouchableOpacity style={[common.buttonActive, common.marginTop10, common.padding10, common.center]} activeOpacity={0.8} onPress={() => this.props.openReturnModal(this.props.openReturn)}>
        <Text style={common.textWhiteSmall}> { 'RETURN' }</Text>
        <Text style={common.textWhiteSmall}>{moment(this.props.return.rangeStart).format('DD/MM/YYYY')}</Text>
      </TouchableOpacity>
    }

    return(
      <View>
        {this.props.addReturn ?
          <View style={[common.end, common.row, common.marginTop10]}>
             <Icon name='cancel' type='materialIcons' color='#e9418b' onPress={this.handleCancelReturn.bind(this)} size={14}/>
             <Text style={common.textSmall} onPress={this.handleCancelReturn.bind(this)}> CANCEL RETURN </Text>
          </View>
        : null
        }
        <View style={[common.row, common.spaceBetween]}>
          <TouchableOpacity style={[common.buttonActive, common.marginTop10, common.center, common.padding10]} activeOpacity={0.8} onPress={() => this.props.openOutwardModal(this.props.openOutward)}>
            <Text style={common.textWhiteSmall}> { 'OUTWARD' }</Text>
            <Text style={common.textWhiteSmall}>{moment(this.props.outward.rangeStart).format('DD/MM/YYYY')}</Text>
          </TouchableOpacity>
          {returnButton}
        </View>
        { this.renderOpenSchedule()}
      </View>
    )
  }
}
