import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../styles'

import ModalDepartureScheduleContainer from './../../../../../../containers/SelectScheduleTiming/ModalContainer/ModalDepartureScheduleContainer'
import ModalDepartureTimingContainer from './../../../../../../containers/SelectScheduleTiming/ModalContainer/ModalDepartureTimingContainer'
import ModalArrivalScheduleContainer from './../../../../../../containers/SelectScheduleTiming/ModalContainer/ModalArrivalScheduleContainer'
import ModalArrivalTimingContainer from './../../../../../../containers/SelectScheduleTiming/ModalContainer/ModalArrivalTimingContainer'

export default class ModalScheduleTiming extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    outward: PropTypes.object.isRequired,
    returnBack: PropTypes.object.isRequired,
    openOutward: PropTypes.bool.isRequired,
    openReturn: PropTypes.bool.isRequired,
    addReturn: PropTypes.bool.isRequired,
    showHideModal: PropTypes.func.isRequired,
    openOutwardModal: PropTypes.func.isRequired,
    openReturnModal: PropTypes.func.isRequired,
    cancelReturn: PropTypes.func.isRequired,
  }



  handleRequestClose(){
    if(this.props.showModal){
      this.props.showHideModal(this.props.showModal)
      if(this.props.title == 'OUTWARD'){
        this.props.openOutwardModal(this.props.openOutward)
      } else{
        this.props.openReturnModal(this.props.openReturn)
      }
    }
  }

  handleCancelReturn(){
    this.props.showHideModal(this.props.showModal)
    this.props.cancelReturn(this.props.addReturn)
  }

  render(){
    if(this.props.title == 'OUTWARD'){
      console.log('AQUIIIIII')
      var textDateTimeDepart = this.props.outward.rangeStart
      var textDateTimeArrival = this.props.outward.rangeEnd
      var addCancelReturn = null

    } else {
      var textDateTimeDepart = this.props.returnBack.rangeStart
      var textDateTimeArrival = this.props.returnBack.rangeEnd
      var addCancelReturn =
        <View style={[common.center, common.row, common.marginTop50]}>
           <Icon name='cancel' type='materialIcons' color='#e9418b' iconStyle={common.padding10} onPress={this.handleCancelReturn.bind(this)}/>
           <Text style={common.textMedium} onPress={this.handleCancelReturn.bind(this)}> Cancel Return </Text>
        </View>
    }

    return(
      <Modal
       animationType="slide"
       transparent={false}
       visible={this.props.showModal}
       onRequestClose={this.handleRequestClose.bind(this)}
       >
      <View style={[common.container, common.justifyContent, common.padding40, common.paddingLeftRight40]}>
        <ScrollView>
          {/* TITLE */}
          <Text style={[common.title, common.center, common.row, common.textCenter]}>{this.props.title}</Text>

          {/* DEPARTURE */}
          <ModalDepartureScheduleContainer type={this.props.title} rangeStart={textDateTimeDepart} />

          {/* LEAVING AT */}
          <ModalDepartureTimingContainer type={this.props.title} rangeStart={textDateTimeDepart} />

          {/* ARRIVAL */}
          <ModalArrivalScheduleContainer type={this.props.title} rangeEnd={textDateTimeArrival} />

          {/* ARRIVING AT */}
          <ModalArrivalTimingContainer type={this.props.title} rangeEnd={textDateTimeArrival} />

          {/* ADD CANCEL RETURN BUTTON IN CASE OF RETURN */}
          {addCancelReturn}

        </ScrollView>
      </View>
     </Modal>
    )
  }

}
