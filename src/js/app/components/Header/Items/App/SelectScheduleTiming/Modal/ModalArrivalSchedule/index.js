import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../../../styles'


export default class ModalArrivalSchedule extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    rangeEnd: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onChangeArrivalDateTime: PropTypes.func.isRequired,
  }

  async renderArrivalDatePicker(){
    if (Platform.OS === 'android'){
      try {
          const {action, year, month, day } = await DatePickerAndroid.open({
          minDate: new Date(),
          date: this.props.rangeEnd
        }).then(date =>{
          const {action, year, month, day } = date
          return date
        }).then(date =>{
          if (date.action !== DatePickerAndroid.dismissedAction) {
            const {action, year, month, day } = date
            const hours = this.props.rangeEnd.getHours()
            const minutes = this.props.rangeEnd.getMinutes()
            this.props.onChangeArrivalDateTime(new Date(year, month, day, hours, minutes), this.props.type)
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
        <Text style={[common.textBold, common.marginTop50]}>{'Arrival'}</Text>
        <View style={[common.center, common.spaceBetween, common.row]}>
         <Text>{moment(this.props.rangeEnd).format('L')}</Text>
         <TouchableOpacity style={common.buttonActive} activeOpacity={0.8} onPress={this.renderArrivalDatePicker.bind(this)}>
           <Icon name='calendar' type='entypo' color='#fff' iconStyle={common.padding10}/>
         </TouchableOpacity>
       </View>
      </View>
    )
  }
}
