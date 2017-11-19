import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'

import common from './../../../../../../../../../styles'

export default class ModalDepartureTiming extends Component {
  constructor(props){
    super(props)

  }

  static propTypes = {
    rangeStart: PropTypes.object.isRequired,
    rangeEnd: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    isDateTimePickerVisibleFrom: PropTypes.bool.isRequired,
    isDateTimePickerVisibleTo: PropTypes.bool.isRequired,
    onChangeDepartureTime: PropTypes.func.isRequired,
    setDateTimePickerVisibleFrom: PropTypes.func.isRequired,
    setDateTimePickerVisibleTo: PropTypes.func.isRequired
  }

  _showDateTimePicker(rangeType){
    if(rangeType == 'from'){
      this.props.setDateTimePickerVisibleFrom(true)
    } else {
      this.props.setDateTimePickerVisibleTo(true)
    }
  }

  _hideDateTimePicker(){
    this.props.setDateTimePickerVisibleFrom(false)
    this.props.setDateTimePickerVisibleTo(false)
  }


  _handleDatePicked = (time) => {
    console.log('A date has been picked: ', time)
    if(this.props.isDateTimePickerVisibleFrom){
      var range = this.props.rangeStart
      var rangeType = 'from'
    } else {
      var range = this.props.rangeEnd
      var rangeType = 'to'
    }
    const year = range.getFullYear()
    const month = range.getMonth()
    const day = range.getDate()
    const hour = time.getHours()
    const minute = time.getMinutes()
    this.props.onChangeDepartureTime(new Date(year, month, day, hour, minute), this.props.type, rangeType)
    this._hideDateTimePicker()
  }

  render(){
    return(
      <View>
        <Text style={[common.textMedium, common.marginTop20]}>{'FROM'}</Text>
        <View style={[common.center, common.spaceBetween, common.row]}>
           <Text>{moment(this.props.rangeStart).format('HH:mm')}</Text>
           <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={() => this._showDateTimePicker('from')}>
             <Icon name='clock' type='entypo' color='#fff' iconStyle={common.padding10}/>
           </TouchableOpacity>
        </View>
        <Text style={[common.textMedium, common.marginTop20]}>{'TO'}</Text>
        <View style={[common.center, common.spaceBetween, common.row]}>
           <Text>{moment(this.props.rangeEnd).format('HH:mm')}</Text>
           <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={() => this._showDateTimePicker('to')}>
             <Icon name='clock' type='entypo' color='#fff' iconStyle={common.padding10}/>
           </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <DateTimePicker
            isVisible={(this.props.isDateTimePickerVisibleFrom || this.props.isDateTimePickerVisibleTo)}
            onConfirm={this._handleDatePicked}
            onCancel={() => this._hideDateTimePicker()}
            mode='time'
          />
        </View>
     </View>
    )
  }
}
