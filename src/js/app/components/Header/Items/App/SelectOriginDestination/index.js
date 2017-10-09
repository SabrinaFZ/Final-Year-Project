'use strict'
import React from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';

import common from './../../../../../../../styles'

export default class SelectOriginDestination extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      listOrigin: ['A', 'B', 'C', 'D'], //props
      originSelected: '',
      listDestination: ['A', 'B', 'C', 'D'], //props
      destinationSelected: '',
      openOutward: false,
      openReturn:false,
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
      addReturn: false
    }
  }

  async onNext() {
    try{
      let response = await fetch('http://10.0.2.2:8080/api/jp/journey-plan',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin: `${this.state.originSelected}`,
          destination: `${this.state.destinationSelected}`,

        })
      }).then((res) => { return res.json() }).then((data)=> {
        console.log(data)
      })
    } catch(errors){
      console.log('Error on posting new journey')
    }
  }

  openOutward(){
    this.setState({openOutward: !this.state.openOutward, openReturn: false})
  }

  openReturn(){
    this.setState({openReturn: !this.state.openReturn, openOutward: false, addReturn: true})
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

  cancel(){
    return null
  }

  renderOpenSchedule(){
    if(this.state.openOutward){
      var title = 'OUTWARD'
      var isVisible = this.state.openOutward
      var handleRequestClose = this.openOutward.bind(this)
      var textDateTimeDepart = this.state.outward.rangeStart
      var textDateTimeArrival = this.state.outward.rangeEnd
      var addCancelReturn = null
    }
    else if(this.state.openReturn){
      var title = 'RETURN'
      var isVisible = this.state.openReturn
      var handleRequestClose = this.openReturn.bind(this)
      var textDateTimeDepart = this.state.returnBack.rangeStart
      var textDateTimeArrival = this.state.returnBack.rangeEnd
      var addCancelReturn =
        <View style={[common.center, common.row, common.marginTop50]}>
           <Icon name='cancel' type='materialIcons' color='#e9418b' iconStyle={common.padding10} onPress={() => this.setState({addReturn: false, openReturn: false})}/>
           <Text style={common.textMedium} onPress={() => this.setState({addReturn: false, openReturn: false})}> Cancel Return </Text>
        </View>
    }
    else{
      return null
    }
    return (
      <Modal
       animationType="slide"
       transparent={false}
       visible={isVisible}
       onRequestClose={handleRequestClose}
       >
      <View style={[common.container, common.justifyContent, common.padding40, common.paddingLeftRight40]}>
        <ScrollView>
          <Text style={[common.title, common.center, common.row, common.textCenter]}>{title}</Text>
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

  render(){
    let originOptions = this.state.listOrigin.map( (value, index) => {
      return <Picker.Item key={index} value={value} label={value} />
    })

    let destinationOptions = this.state.listDestination.map( (value, index) => {
      return <Picker.Item key={index} value={value} label={value} />
    })

    if(!this.state.addReturn){
      var returnButton =
        <TouchableOpacity style={[common.buttonDisabled, common.marginTop20]} activeOpacity={0.8} onPress={this.openReturn.bind(this)}>
          <Text style={common.textButton}> { 'ADD RETURN' }</Text>
        </TouchableOpacity>
    }else if(this.state.addReturn){
      var returnButton =
        <TouchableOpacity style={[common.buttonActive, common.marginTop20]} activeOpacity={0.8} onPress={this.openReturn.bind(this)}>
          <Text style={common.textButton}> { 'RETURN' }</Text>
        </TouchableOpacity>
    }

    return(
      <View style={[common.container, common.start, common.padding40, common.paddingTop80]}>
        <ScrollView>
        <Text style={common.textBold}>{ 'Origin' }</Text>
        <View style={common.row}>
          <Icon name='search' type='EvilIcons' />
          <TextInput
            style={common.input}
            onChangeText={this.onNext.bind(this)}
            placeholder='Search in the map...'
          />
        </View>
        <Picker
          selectedValue='{this.state.originSelected}'
          onValueChange={(itemValue, itemIndex) => this.setState({originSelected: itemValue})}>
          {originOptions}
        </Picker>

        <Text style={common.textBold}>{ 'Destination' }</Text>
        <View style={common.row}>
          <Icon name='search' type='EvilIcons' />
          <TextInput
            style={common.input}
            onChangeText={this.onNext.bind(this)}
            placeholder='Search in the map...'
          />
        </View>
        <Picker
          selectedValue={this.state.destinationSelected}
          onValueChange={(itemValue, itemIndex) => this.setState({destinationSelected: itemValue})}>
          {destinationOptions}
        </Picker>

        {/* <TouchableOpacity style={common.submit} activeOpacity={0.8} onPress={this.onNext.bind(this) }>
          <Text style={common.textSubmit}> { 'NEXT' }</Text>
        </TouchableOpacity> */}

        <View style={[common.row, common.spaceBetween]}>
          <TouchableOpacity style={[common.buttonActive, common.marginTop20]} activeOpacity={0.8} onPress={this.openOutward.bind(this)}>
            <Text style={common.textButton}> { 'OUTWARD' }</Text>
          </TouchableOpacity>

          {returnButton}
        </View>

        {this.renderOpenSchedule()}
      </ScrollView>
    </View>
    )
  }
}
