import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../../styles'

export default class ModalArrivalTiming extends Component {
  constructor(props){
    super(props)

    this.renderArrivalTimePicker = this.renderArrivalTimePicker.bind(this)
  }

  static propTypes = {
    rangeStart: PropTypes.object.isRequired,
    rangeEnd: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onChangeArrivalTime: PropTypes.func.isRequired,
  }

  async renderArrivalTimePicker(rangeType){
    if(rangeType == 'from'){
      var range = this.props.rangeStart
    } else {
      var range = this.props.rangeEnd
    }
    if (Platform.OS === 'android'){
      try {
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: range.getHours(),
          minute: range.getMinutes(),
          is24Hour: true,
        }).then(time =>{
          const {action, hour, minute} = time
          return time
        }).then(time =>{
          if (time.action !== TimePickerAndroid.dismissedAction) {
            const {action, hour, minute} = time
            const year = range.getFullYear()
            const month = range.getMonth()
            const day = range.getDate()
            this.props.onChangeArrivalTime(new Date(year, month, day, hour, minute), this.props.type, rangeType)
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

  render(){
    return(
      <View>
        <Text style={[common.textMedium, common.marginTop20]}>{'Arriving At'}</Text>
        <Text style={[common.textMedium, common.marginTop20]}>{'From'}</Text>
        <View style={[common.center, common.spaceBetween, common.row]}>
           <Text>{moment(this.props.rangeStart).format('HH:mm')}</Text>
           <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={() => (this.renderArrivalTimePicker('from'))}>
             <Icon name='clock' type='entypo' color='#fff' iconStyle={common.padding10}/>
           </TouchableOpacity>
        </View>

        <Text style={[common.textMedium, common.marginTop20]}>{'To'}</Text>
        <View style={[common.center, common.spaceBetween, common.row]}>
           <Text>{moment(this.props.rangeEnd).format('HH:mm')}</Text>
           <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={() => (this.renderArrivalTimePicker('to'))}>
             <Icon name='clock' type='entypo' color='#fff' iconStyle={common.padding10}/>
           </TouchableOpacity>
        </View>
     </View>
    )
  }
}
