'use strict'
import React, { PropTypes } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';

import common from './../../../../../../../styles'

import SelectScheduleTimingContainer from '../../../../../containers/SelectScheduleTiming'
import SelectPassengersContainer from '../../../../../containers/SelectPassengers'
import FindTrainsButton from './../FindTrainsButton'

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

  goMap(){

  }

  render(){
    let originOptions = this.props.listOrigin.map( (value, index) => {
      return <Picker.Item key={index} value={value} label={value} />
    })

    let destinationOptions = this.props.listDestination.map( (value, index) => {
      return <Picker.Item key={index} value={value} label={value} />
    })


    return(
      <View style={[common.container, common.start, common.padding40]}>
        <ScrollView>
        <Text style={common.textBold}>{ 'Origin' }</Text>
        <View style={common.row}>
          <Icon name='search' type='EvilIcons' />
          <TextInput
            style={common.input}
            onChangeText={this.goMap.bind(this)}
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
            onChangeText={this.goMap.bind(this)}
            placeholder='Search in the map...'
          />
        </View>
        <Picker
          selectedValue={this.props.destinationSelected}
          onValueChange={(itemValue, itemIndex) => this.props.setDestination(itemValue)}>
          {destinationOptions}
        </Picker>
        <SelectScheduleTimingContainer />
        <SelectPassengersContainer />
        <FindTrainsButton navigation={this.props.navigation} />
      </ScrollView>
    </View>
    )
  }
}
