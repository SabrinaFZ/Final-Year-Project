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
    listOrigin: PropTypes.arrayOf(PropTypes.object),
    listDestination: PropTypes.arrayOf(PropTypes.object),
    originSelected: PropTypes.string,
    destinationSelected: PropTypes.string,
    resultOrigin: PropTypes.arrayOf(PropTypes.string),
    resultDestination: PropTypes.arrayOf(PropTypes.string),
    setOrigin: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired,
    getOrigin: PropTypes.func.isRequired,
    resetListOrigin: PropTypes.func.isRequired,
    getDestination: PropTypes.func.isRequired,
    resetListDestination: PropTypes.func.isRequired,
    setResultOrigin: PropTypes.func.isRequired,
    setResultDestination: PropTypes.func.isRequired,
  }

  componentWillMount(){
    let baseOriginURL = `https://api-southern.stage.otrl.io/config/stations?type=Origin`
    this.props.getOrigin(baseOriginURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    let baseDestinationURL = `https://api-southern.stage.otrl.io/config/stations?type=Destination`
    this.props.getDestination(baseDestinationURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }


  onChangeDestinationText(text){
    this.props.resetListDestination()
    if(text != ''  && text.length >= 3){
      this.searchDestination(text)
    }
  }

  searchOrigin(text){
    var originOptions = []
    text = text.toLowerCase()
    if(text != ''  && text.length >= 3){
      console.log(this.props.listOrigin)
      this.props.listOrigin.forEach((item) => {
        if((item.name.toLowerCase()).includes(text)){
          originOptions.push(item.name)
          console.log('result:'+originOptions)
        }
      })
      this.props.setResultOrigin(originOptions)
    }else{
      this.props.resetListOrigin()
    }
  }

  searchDestination(text){

  }

  goMap(){

  }


  render(){
    let originOptions = this.props.resultOrigin.map( (value, index) => {
      return <Picker.Item key={index} value={value} label={value} />
    })
    


    // let destinationOptions = this.props.listDestination.map( (value, index) => {
    //   return <Picker.Item key={index} value={value} label={value} />
    // })


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

        <View style={[common.searchBar, common.marginBottom20]}>
          <TextInput
            onChangeText={(text) => this.searchOrigin(text)}
            placeholder='Enter Origin...'
            underlineColorAndroid='#e9418b'
          />
          <Picker
            selectedValue={this.props.originSelected}
            onValueChange={(itemValue, itemIndex) => this.props.setOrigin(itemValue)}>
            {originOptions}
          </Picker>
        </View>


          <Text style={common.textBold}>{ 'Destination' }</Text>
          <View style={common.row}>
            <Icon name='search' type='EvilIcons' />
            <TextInput
              style={common.input}
              onChangeText={this.goMap.bind(this)}
              placeholder='Search in the map...'
            />
          </View>
        <View style={[common.searchBar, common.marginBottom20]}>
          <TextInput
            onChangeText={(text) => this.onChangeDestinationText(text)}
            placeholder='Enter Destination...'
            underlineColorAndroid='#e9418b'
          />
          <Picker
            selectedValue={this.props.destinationSelected}
            onValueChange={(itemValue, itemIndex) => this.props.setDestination(itemValue)}>
            {/* {destinationOptions} */}
          </Picker>
        </View>
        <SelectScheduleTimingContainer />
        <SelectPassengersContainer />
        <FindTrainsButton navigation={this.props.navigation} />
      </ScrollView>
    </View>
    )
  }
}
