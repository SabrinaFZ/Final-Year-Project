import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../styles'

import ModalDepartureShedule from './ModalDepartureShedule'
import ModalDepartureTiming from './ModalDepatureTiming'
import ModalArrivalSchedule from './ModalArrivalSchedule'
import ModalArrivalTiming from './ModalArrivalTiming'

export default class ModalScheduleTiming extends Component {
  constructor(props){
    super(props)

    this.state = {
      showModal: true,
      outward: {
        rangeStart: new Date(),
        rangeEnd: new Date(),
        arriveDepart: '',
      },
      returnBack: {
        rangeStart: new Date(),
        rangeEnd: new Date(),
        arriveDepart: '',
      },
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    handleCancelReturn: PropTypes.func,
  }

  onDepartureDateTimeChange(date, type){
    if(type == 'OUTWARD'){
      this.setState({
        outward: {
          rangeStart: date,
          rangeEnd: this.state.outward.rangeEnd,
          arriveDepart: 'Depart'
        }
      })

    }
    else {
      this.setState({
        returnBack: {
          rangeStart: date,
          rangeEnd: this.state.returnBack.rangeEnd,
          arriveDepart: 'Depart'
        }
      })
    }
  }

  onArrivalDateTimeChange(date, type){
    if(type == 'OUTWARD'){
      this.setState({
        outward: {
          rangeStart: this.state.outward.rangeStart,
          rangeEnd: date,
          arriveDepart: 'Arrive'
        }
      })
    }
    else {
      this.setState({
        returnBack: {
          rangeStart: this.state.returnBack.rangeStart,
          rangeEnd: date,
          arriveDepart: 'Arrive'
        }
      })
    }
  }

  handleRequestClose(){
    if(this.state.showModal){
      this.setState({showModal: false})
      this.props.handleRequestClose()
    }
  }

  handleCancelReturn(){
    this.setState({showModal: false })
    this.props.handleCancelReturn()
  }

  render(){
    console.log(this.state.outward.rangeStart)
    if(this.props.title == 'OUTWARD'){
      var textDateTimeDepart = this.state.outward.rangeStart
      var textDateTimeArrival = this.state.outward.rangeEnd
      var addCancelReturn = null

    } else {
      var textDateTimeDepart = this.state.returnBack.rangeStart
      var textDateTimeArrival = this.state.returnBack.rangeEnd
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
       visible={this.state.showModal}
       onRequestClose={this.handleRequestClose.bind(this)}
       >
      <View style={[common.container, common.justifyContent, common.padding40, common.paddingLeftRight40]}>
        <ScrollView>
          {/* TITLE */}
          <Text style={[common.title, common.center, common.row, common.textCenter]}>{this.props.title}</Text>

          {/* DEPARTURE */}
          <ModalDepartureShedule type={this.props.title} rangeStart={textDateTimeDepart} onChangeDate={this.onDepartureDateTimeChange.bind(this)} />

          {/* LEAVING AT */}
          <ModalDepartureTiming type={this.props.title} rangeStart={textDateTimeDepart} onChangeDate={this.onDepartureDateTimeChange.bind(this)}/>

          {/* ARRIVAL */}
          <ModalArrivalSchedule type={this.props.title} rangeEnd={textDateTimeArrival} onChangeDate={this.onArrivalDateTimeChange.bind(this)}/>

          {/* ARRIVING AT */}
          <ModalArrivalTiming type={this.props.title} rangeEnd={textDateTimeArrival} onChangeDate={this.onArrivalDateTimeChange.bind(this)}/>

          {/* ADD CANCEL RETURN BUTTON IN CASE OF RETURN */}
          {addCancelReturn}

        </ScrollView>
      </View>
     </Modal>
    )
  }

}
