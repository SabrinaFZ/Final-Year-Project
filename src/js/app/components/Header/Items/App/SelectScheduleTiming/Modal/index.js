import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../styles'

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

  onDepartureDateTimeChange(date){
    if(this.state.openOutward){
      this.setState({
        outward: {
          rangeStart: date,
          rangeEnd: this.state.outward.rangeEnd,
          arriveDepart: 'Depart'
        }
      })

    }
    else if(this.state.openReturn){
      this.setState({
        returnBack: {
          rangeStart: date,
          rangeEnd: this.state.returnBack.rangeEnd,
          arriveDepart: 'Depart'
        }
      })
    }
  }

  onArrivalDateTimeChange(date){
    if(this.state.openOutward){
      this.setState({
        outward: {
          rangeStart: this.state.outward.rangeStart,
          rangeEnd: date,
          arriveDepart: 'Arrive'
        }
      })
    }
    else if(this.state.openReturn){
      this.setState({
        returnBack: {
          rangeStart: this.state.returnBack.rangeStart,
          rangeEnd: date,
          arriveDepart: 'Arrive'
        }
      })
    }
  }

  async renderDepartureDatePicker(){
    if (Platform.OS === 'android'){
      try {
          if(this.state.openOutward){
            var defaultDate = this.state.outward.rangeStart
          } else{
            var defaultDate = this.state.returnBack.rangeStart
          }
          const {action, year, month, day } = await DatePickerAndroid.open({
          date: defaultDate
        }).then(date =>{
          const {action, year, month, day } = date
          return date
        }).then(date =>{
          if (date.action !== DatePickerAndroid.dismissedAction) {
            const {action, year, month, day } = date
            const hours = defaultDate.getHours()
            const minutes = defaultDate.getMinutes()
            this.onDepartureDateTimeChange(new Date(year, month, day, hours, minutes))
          }
          else{
            //Don't change the date
          }
        })
      } catch ({code, message}) {
        console.log('Cannot open date picker', message);
      }
    }
  }

  async renderArrivalDatePicker(){
    if (Platform.OS === 'android'){
      if(this.state.openOutward){
        var defaultDate = this.state.outward.rangeEnd
      } else{
        var defaultDate = this.state.returnBack.rangeEnd
      }
      try {
          const {action, year, month, day } = await DatePickerAndroid.open({
          date: defaultDate
        }).then(date =>{
          const {action, year, month, day } = date
          return date
        }).then(date =>{
          if (date.action !== DatePickerAndroid.dismissedAction) {
            const {action, year, month, day } = date
            const hours = defaultDate.getHours()
            const minutes = defaultDate.getMinutes()
            this.onArrivalDateTimeChange(new Date(year, month, day, hours, minutes))
          }
          else{
            //Don't change the date
          }
        })
      } catch ({code, message}) {
        console.log('Cannot open date picker', message);
      }
    }
  }

  async renderDepartureTimePicker(){
    if (Platform.OS === 'android'){
      if(this.state.openOutward){
        var defaultState = this.state.outward.rangeStart
      } else{
        var defaultState = this.state.returnBack.rangeStart
      }
      try {
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: defaultState.getHours(),
          minute: defaultState.getMinutes(),
          is24Hour: true,
        }).then(time =>{
          const {action, hour, minute} = time
          return time
        }).then(time =>{
          if (time.action !== TimePickerAndroid.dismissedAction) {
            const {action, hour, minute} = time
            const year = defaultState.getFullYear()
            const month = defaultState.getMonth()
            const day = defaultState.getDate()
            this.onDepartureDateTimeChange(new Date(year, month, day, hour, minute))
          }
          else{
            //Dont change the time
          }
        })

      } catch ({code, message}) {
        console.log('Cannot open time picker', message);
      }
    }
  }

  async renderArrivalTimePicker(){
    if (Platform.OS === 'android'){
      if(this.state.openOutward){
        var defaultState = this.state.outward.rangeEnd
      } else{
        var defaultState = this.state.returnBack.rangeEnd
      }
      try {
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: defaultState.getHours(),
          minute: defaultState.getMinutes(),
          is24Hour: true,
        }).then(time =>{
          const {action, hour, minute} = time
          return time
        }).then(time =>{
          if (time.action !== TimePickerAndroid.dismissedAction) {
            const {action, hour, minute} = time
            const year = defaultState.getFullYear()
            const month = defaultState.getMonth()
            const day = defaultState.getDate()
            this.onArrivalDateTimeChange(new Date(year, month, day, hour, minute))
          }
          else{
            //Dont change the time
          }
        })

      } catch ({code, message}) {
        console.log('Cannot open time picker', message);
      }
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
          <Text style={[common.title, common.center, common.row, common.textCenter]}>{this.props.title}</Text>
          <Text style={[common.textBold, common.marginTop50]}>{'Departure'}</Text>
          <View style={[common.center, common.spaceBetween, common.row]}>
           <Text>{moment(textDateTimeDepart).format('L')}</Text>
           <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={this.renderDepartureDatePicker.bind(this)}>
             <Icon name='calendar' type='entypo' color='#fff' iconStyle={common.padding10}/>
           </TouchableOpacity>
         </View>
          <Text style={[common.textMedium, common.marginTop20]}>{'Leaving At'}</Text>
          <View style={[common.center, common.spaceBetween, common.row]}>
           <Text>{moment(textDateTimeDepart).format('HH:mm')}</Text>
           <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={this.renderDepartureTimePicker.bind(this)}>
             <Icon name='clock' type='entypo' color='#fff' iconStyle={common.padding10}/>
           </TouchableOpacity>
         </View>

         <Text style={[common.textBold, common.marginTop50]}>{'Arrival'}</Text>
         <View style={[common.center, common.spaceBetween, common.row]}>
          <Text>{moment(textDateTimeArrival).format('L')}</Text>
          <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={this.renderArrivalDatePicker.bind(this)}>
            <Icon name='calendar' type='entypo' color='#fff' iconStyle={common.padding10}/>
          </TouchableOpacity>
        </View>
        <Text style={[common.textMedium, common.marginTop20]}>{'Arriving At'}</Text>
        <View style={[common.center, common.spaceBetween, common.row]}>
         <Text>{moment(textDateTimeArrival).format('HH:mm')}</Text>
         <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={(this.renderArrivalTimePicker.bind(this))}>
           <Icon name='clock' type='entypo' color='#fff' iconStyle={common.padding10}/>
         </TouchableOpacity>
       </View>

       {addCancelReturn}

        </ScrollView>
      </View>
     </Modal>
    )
  }

}
