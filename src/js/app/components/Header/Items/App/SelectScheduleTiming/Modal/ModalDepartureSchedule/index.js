import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../../styles'


export default class ModalDepartureSchedule extends Component {
  constructor(props){
    super(props)

  }

  static propTypes = {
    rangeStart: PropTypes.object.isRequired,
    rangeEnd: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onChangeDepartureDateTime: PropTypes.func.isRequired,
  }

  async renderDepartureDatePicker(){
    let minDate = new Date()
    if(this.props.type == 'RETURN'){
      minDate = this.props.rangeStart
    }
    if (Platform.OS === 'android'){
      try {
          const {action, year, month, day } = await DatePickerAndroid.open({
          minDate: minDate,
          date: this.props.rangeStart
        }).then(date =>{
          const {action, year, month, day } = date
          return date
        }).then(date =>{
          if (date.action !== DatePickerAndroid.dismissedAction) {
            const {action, year, month, day } = date
            const hoursLeaving = this.props.rangeStart.getHours()
            const minutesLeaving = this.props.rangeStart.getMinutes()
            const hoursArriving = this.props.rangeEnd.getHours()
            const minutesArriving = this.props.rangeEnd.getMinutes()
            this.props.onChangeDepartureDateTime(new Date(year, month, day, hoursLeaving, minutesLeaving), new Date(year, month, day, hoursArriving, minutesArriving), this.props.type)
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

  render(){
    return(
      <View>
        <Text style={[common.textBold, common.marginTop50]}>{'Departure'}</Text>
        <View style={[common.center, common.spaceBetween, common.row]}>
           <Text>{moment(this.props.rangeStart).format('L')}</Text>
           <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={this.renderDepartureDatePicker.bind(this)}>
             <Icon name='calendar' type='entypo' color='#fff' iconStyle={common.padding10}/>
           </TouchableOpacity>
        </View>
      </View>
    )
  }
}
