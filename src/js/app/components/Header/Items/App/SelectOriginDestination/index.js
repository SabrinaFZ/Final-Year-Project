'use strict'
import React, { PropTypes } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';

import common from './../../../../../../../styles'

import SelectScheduleTimingContainer from '../../../../../containers/SelectScheduleTiming'

export default class SelectOriginDestination extends React.Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    listOrigin: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    listDestination: PropTypes.arrayOf(PropTypes.string).isRequired,
    originSelected: PropTypes.string.isRequired,
    destinationSelected: PropTypes.string.isRequired,
    post: PropTypes.func.isRequired,
    setOrigin: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired,
  }

  async onNext() {
    try{
      let response = await this.props.post('http://10.0.2.2:8080/api/jp/journey-plan',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin: `${this.state.originSelected}`,
          destination: `${this.state.destinationSelected}`,

        })
      })
    } catch(errors){
      console.log('Error on posting new journey')
    }
  }


  render(){
    let originOptions = this.props.listOrigin.map( (value, index) => {
      return <Picker.Item key={index} value={value} label={value} />
    })

    let destinationOptions = this.props.listDestination.map( (value, index) => {
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
          selectedValue={this.props.originSelected}
          onValueChange={(itemValue, itemIndex) => this.props.setOrigin(itemValue)}>
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
          selectedValue={this.props.destinationSelected}
          onValueChange={(itemValue, itemIndex) => this.props.setDestination(itemValue)}>
          {destinationOptions}
        </Picker>
        <SelectScheduleTimingContainer />
      </ScrollView>
    </View>
    )
  }
}
