import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../../styles'

export default class ModalArrivalTiming extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    rangeEnd: PropTypes.object.isRequired,
    onChangeDate: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  }

  async renderArrivalTimePicker(){
    if (Platform.OS === 'android'){
      try {
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: this.props.rangeEnd.getHours(),
          minute: this.props.rangeEnd.getMinutes(),
          is24Hour: true,
        }).then(time =>{
          const {action, hour, minute} = time
          return time
        }).then(time =>{
          if (time.action !== TimePickerAndroid.dismissedAction) {
            const {action, hour, minute} = time
            const year = this.props.rangeEnd.getFullYear()
            const month = this.props.rangeEnd.getMonth()
            const day = this.props.rangeEnd.getDate()
            this.props.onChangeDate(new Date(year, month, day, hour, minute), this.props.type)
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
        <View style={[common.center, common.spaceBetween, common.row]}>
           <Text>{moment(this.props.rangeEnd).format('HH:mm')}</Text>
           <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={(this.renderArrivalTimePicker.bind(this))}>
             <Icon name='clock' type='entypo' color='#fff' iconStyle={common.padding10}/>
           </TouchableOpacity>
        </View>
     </View>
    )
  }
}
