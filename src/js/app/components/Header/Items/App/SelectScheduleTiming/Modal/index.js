import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../styles'

import ModalDepartureScheduleContainer from './../../../../../../containers/SelectScheduleTiming/ModalContainer/ModalDepartureScheduleContainer'
import ModalDepartureTimingContainer from './../../../../../../containers/SelectScheduleTiming/ModalContainer/ModalDepartureTimingContainer'
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
    arrivingLeaving: PropTypes.string.isRequired,
    showHideModal: PropTypes.func.isRequired,
    openOutwardModal: PropTypes.func.isRequired,
    openReturnModal: PropTypes.func.isRequired,
    cancelReturn: PropTypes.func.isRequired,
    setArrivingLeaving: PropTypes.func.isRequired,
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

  handleValueChange(itemValue){
    this.props.setArrivingLeaving(itemValue)
  }

  render(){
    if(this.props.title == 'OUTWARD'){
      var textDateTimeFrom = this.props.outward.rangeStart
      var textDateTimeTo = this.props.outward.rangeEnd
      var addCancelReturn = null

    } else {
      var textDateTimeFrom = this.props.returnBack.rangeStart
      var textDateTimeTo = this.props.returnBack.rangeEnd
      var addCancelReturn =
        <View style={[common.center, common.row, common.marginTop50]}>
           <Icon name='cancel' type='materialIcons' color='#e9418b' iconStyle={common.padding10} onPress={this.handleCancelReturn.bind(this)}/>
           <Text style={common.textMedium} onPress={this.handleCancelReturn.bind(this)}> Cancel Return </Text>
        </View>
    }

    if(this.props.arrivingLeaving == 'Leaving'){
      var modalTimePicker = <ModalDepartureTimingContainer type={this.props.title} rangeStart={textDateTimeFrom} rangeEnd={textDateTimeTo} />
    } else {
      var modalTimePicker = <ModalArrivalTimingContainer type={this.props.title} rangeStart={textDateTimeFrom} rangeEnd={textDateTimeTo} />
    }


    return(
      <Modal
       animationType="none"
       transparent={false}
       visible={this.props.showModal}
       onRequestClose={this.handleRequestClose.bind(this)}
       >
      <View style={[common.container, common.justifyContent, common.padding40, common.paddingLeftRight40]}>
        <ScrollView>
          {/* TITLE */}
          <Text style={[common.title, common.center, common.row, common.textCenter]}>{this.props.title}</Text>

          {/* DEPARTURE */}
          <ModalDepartureScheduleContainer type={this.props.title} rangeStart={textDateTimeFrom} rangeEnd={textDateTimeTo}/>

          <Picker
            style={common.marginTop20}
            selectedValue={this.props.arrivingLeaving}
            onValueChange={(itemValue, itemIndex) => this.handleValueChange(itemValue, itemIndex)}>
            <Picker.Item value='Leaving' label='Leaving At' />
            <Picker.Item value='Arriving' label='Arriving At' />
          </Picker>

          {/* LEAVING AT / ARRIVING AT */}
          {modalTimePicker}

          {/* ADD CANCEL RETURN BUTTON IN CASE OF RETURN */}
          {addCancelReturn}

        </ScrollView>
      </View>
     </Modal>
    )
  }

}
