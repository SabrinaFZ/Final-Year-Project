import React, { PropTypes, Component } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons//MaterialCommunityIcons'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'

import common from './../../../../../../../../../styles'

export default class ModalArrivalTiming extends Component {
  constructor(props){
    super(props)

    this.state = {
      changeTime: false
    }
  }

  static propTypes = {
    rangeStart: PropTypes.object.isRequired,
    rangeEnd: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onChangeArrivalTime: PropTypes.func.isRequired,
  }

  handleDatePicked = (time) => {
    this.setState({changeTime: false})
    let rangeFrom = this.props.rangeStart
    let rangeTo = this.props.rangeStart

    const year = rangeFrom.getFullYear()
    const month = rangeFrom.getMonth()
    const day = rangeFrom.getDate()
    let hourFrom = rangeFrom.getHours()
    let hourTo = rangeTo.getHours()
    let minute = rangeFrom.getMinutes()
    if(time == 'morning'){
      hourFrom = 9
      hourTo = 11
      minute = 0
    }
    if(time == 'afternoon'){
      hourFrom = 11
      hourTo = 19
      minute = 0
    }
    if(time == 'night'){
      hourFrom = 19
      hourTo = 0
      minute = 0
    }
    this.props.onChangeArrivalTime(new Date(year, month, day, hourFrom, minute), this.props.type, 'from')
    this.props.onChangeArrivalTime(new Date(year, month, day, hourTo, minute), this.props.type, 'to')
  }

  render(){
    let morningButton =
      <View style={common.center}>
        <TouchableOpacity style={[common.marginTop20, common.buttonActiveLarge]} activeOpacity={0.8} onPress={() => this.handleDatePicked('morning')}>
          <View style={[common.row, common.padding10, common.center]}>
            <Icon name='weather-sunny' type='MaterialCommunityIcons' color='#fff' size={30} style={{marginRight: 20}}/>
            <Text style={common.textWhiteSmall}>Morning</Text>
          </View>
        </TouchableOpacity>
        <Text style={common.textSmall}>From 9:00 to 11:00 </Text>
      </View>

    let afternoonButton =
    <View style={common.center}>
      <TouchableOpacity style={[common.marginTop20, common.buttonActiveLarge]} activeOpacity={0.8} onPress={() => this.handleDatePicked('afternoon')}>
        <View style={[common.row, common.padding10, common.center]}>
          <Icon name='weather-sunset' type='MaterialCommunityIcons' color='#fff' size={30} style={{marginRight: 20}}/>
          <Text style={common.textWhiteSmall}>Afternoon</Text>
        </View>
      </TouchableOpacity>
      <Text style={common.textSmall}>From 11:00 to 19:00 </Text>
    </View>

    let nightButton =
    <View style={common.center}>
      <TouchableOpacity style={[common.marginTop20, common.buttonActiveLarge]} activeOpacity={0.8} onPress={() => this.handleDatePicked('night')}>
        <View style={[common.row, common.padding10, common.center]}>
          <Icon name='weather-night' type='MaterialCommunityIcons' color='#fff' size={30} style={{marginRight: 20}}/>
          <Text style={common.textWhiteSmall}>Night</Text>
        </View>
      </TouchableOpacity>
      <Text style={common.textSmall}>From 19:00 to 0:00 </Text>
    </View>

    let options =
      <View>
        {morningButton}
        {afternoonButton}
        {nightButton}
      </View>

    if(this.props.rangeStart.getHours() == 9 && this.props.rangeEnd.getHours() == 11){
      return (
        <View>
          { !this.state.changeTime ?
            <View>
              {morningButton}
              <TouchableOpacity style={[common.marginTop20, common.center, common.box, common.padding10]} activeOpacity={0.8} onPress={() => this.setState({changeTime: true})}>
                <Text style={common.textMedium}>CHANGE TIME</Text>
              </TouchableOpacity>
            </View>
          :
            <View>
              {options}
            </View>
          }
        </View>
      )
    }

    else if(this.props.rangeStart.getHours() == 11 && this.props.rangeEnd.getHours() == 19){
      return(
        <View>
          { !this.state.changeTime ?
            <View>
              {afternoonButton}
              <TouchableOpacity style={[common.marginTop20, common.center, common.box, common.padding10]} activeOpacity={0.8} onPress={() => this.setState({changeTime: true})}>
                <Text style={common.textMedium}>CHANGE TIME</Text>
              </TouchableOpacity>
            </View>
          :
            <View>
              {options}
            </View>
          }
        </View>
      )
    }

    else if(this.props.rangeStart.getHours() == 19 && this.props.rangeEnd.getHours() == 0){
      return(
        <View>
          { !this.state.changeTime ?
            <View>
              {nightButton}
              <TouchableOpacity style={[common.marginTop20, common.center, common.box, common.padding10]} activeOpacity={0.8} onPress={() => this.setState({changeTime: true})}>
                <Text style={common.textMedium}>CHANGE TIME</Text>
              </TouchableOpacity>
            </View>
          :
            <View>
              {options}
            </View>
          }
        </View>
      )
    }

    else {
      return(
        <View>
          {options}
        </View>
      )
    }
  }
}
