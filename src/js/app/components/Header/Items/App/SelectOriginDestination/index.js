'use strict'
import React from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';

import common from './../../../../../../../styles'

import SelectScheduleTiming from '../SelectScheduleTiming'

export default class SelectOriginDestination extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      listOrigin: ['A', 'B', 'C', 'D'], //props
      originSelected: '',
      listDestination: ['A', 'B', 'C', 'D'], //props
      destinationSelected: '',
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


  render(){
    let originOptions = this.state.listOrigin.map( (value, index) => {
      return <Picker.Item key={index} value={value} label={value} />
    })

    let destinationOptions = this.state.listDestination.map( (value, index) => {
      return <Picker.Item key={index} value={value} label={value} />
    })


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
        <SelectScheduleTiming />
      </ScrollView>
    </View>
    )
  }
}
