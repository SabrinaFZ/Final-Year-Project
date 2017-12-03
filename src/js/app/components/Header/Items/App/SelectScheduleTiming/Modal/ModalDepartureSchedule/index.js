import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'

import common from './../../../../../../../../../styles'


export default class ModalDepartureSchedule extends Component {
constructor(props){
  super(props)

}

static propTypes = {
  rangeStart: PropTypes.object.isRequired,
  rangeEnd: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  isDateTimePickerVisible: PropTypes.bool.isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
  onChangeDepartureDateTime: PropTypes.func.isRequired,
  setDateTimePickerVisible: PropTypes.func.isRequired
}

_showDateTimePicker = () => this.props.setDateTimePickerVisible(true)

_hideDateTimePicker = () => this.props.setDateTimePickerVisible(false)

_handleDatePicked = (date) => {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hoursLeaving = this.props.rangeStart.getHours()
    const minutesLeaving = this.props.rangeStart.getMinutes()
    const hoursArriving = this.props.rangeEnd.getHours()
    const minutesArriving = this.props.rangeEnd.getMinutes()
    this.props.onChangeDepartureDateTime(new Date(year, month, day, hoursLeaving, minutesLeaving), new Date(year, month, day, hoursArriving, minutesArriving), this.props.type)
    this._hideDateTimePicker()
}

render(){
  return(
    <View>
      <Text style={[common.textBold, common.marginTop50]}>{'DEPARTURE'}</Text>
      <View style={[common.center, common.spaceBetween, common.row]}>
        <Text>{moment(this.props.rangeStart).format('DD/MM/YYYY')}</Text>
          <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={this._showDateTimePicker}>
            <Icon name='calendar' type='entypo' color='#fff' iconStyle={common.padding10}/>
          </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <DateTimePicker
          isVisible={this.props.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          minimumDate={this.props.minDate}
          date={this.props.rangeStart}
        />
      </View>
    </View>
  )
}
}
