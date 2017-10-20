'use strict'
import React, { PropTypes } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'
import Spinner from 'react-native-spinkit'

import common from './../../../../../../../styles'
import welcome from '../../../../../../../styles'

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
    destinationSelected: PropTypes.string.isRequired,
    resultOrigin: PropTypes.arrayOf(PropTypes.string),
    resultDestination: PropTypes.arrayOf(PropTypes.string),
    loadingOrigin: PropTypes.bool.isRequired,
    loadingDestination: PropTypes.bool.isRequired,
    setOrigin: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired,
    getOrigin: PropTypes.func.isRequired,
    getDestination: PropTypes.func.isRequired,
    resetListOrigin: PropTypes.func.isRequired,
    resetListDestination: PropTypes.func.isRequired,
    setResultOrigin: PropTypes.func.isRequired,
    setResultDestination: PropTypes.func.isRequired,
    isLoadingOrigin: PropTypes.func.isRequired,
    isLoadingDestination: PropTypes.func.isRequired,
  }

  onChangeOriginText(text){
    this.props.resetListOrigin()
    if(text != ''  && text.length >= 3){
      this.props.isLoadingOrigin(true)
      this.searchOrigin(text)
    }
  }

  onChangeDestinationText(text){
    this.props.resetListDestination()
    if(text != ''  && text.length >= 3){
      this.props.isLoadingDestination(true)
      this.searchDestination(text)
    }
  }

  async searchOrigin(text){
    let baseURL = `https://api-southern.stage.otrl.io/config/stations?search=${text}&type=Origin`
    await this.props.getOrigin(baseURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  async searchDestination(text){
    let baseURL = `https://api-southern.stage.otrl.io/config/stations?search=${text}&type=Destination`
    await this.props.getDestination(baseURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  componentDidUpdate(prevProps){
    console.log(prevProps)
    console.log(this.props)
    /*
      we check if the current resultOrigin is empty, otherwise we check that the previous result value is different from the new one if it's not we set a new result
    */
    if((this.props.listOrigin.length != 0 && prevProps.listOrigin.length !== this.props.listOrigin.length)){
      this.setResultOrigin()
    }
    if((this.props.listDestination.length != 0 && prevProps.listDestination.length !== this.props.listDestination.length)){
      this.setResultDestination()
    }
    else{
      //nothing
    }
  }

  setResultOrigin(){
    var originOptions = []
    if((this.props.listOrigin).length != 0){
      this.props.listOrigin.forEach((item) => {
        originOptions.push(item.name)
      })
      this.props.setResultOrigin(originOptions)
    }
  }

  setResultDestination(){
    var destinationOptions = []
    if((this.props.listDestination).length != 0){
      this.props.listDestination.forEach((item) => {
        destinationOptions.push(item.name)
      })
      this.props.setResultDestination(destinationOptions)
    }
  }

  goMap(){

  }


  render(){
    if((this.props.resultOrigin).length != 0){
      var originOptions = (this.props.resultOrigin).map( (value, index) => {
        return <Picker.Item key={index} value={value} label={value} />
      })
      var pickerOrigin =
        <Picker
          selectedValue={this.props.originSelected}
          onValueChange={(itemValue, itemIndex) => this.props.setOrigin(itemValue)}>
          {originOptions}
        </Picker>
    }
    if((this.props.resultDestination).length != 0){
      var destinationOptions = (this.props.resultDestination).map( (value, index) => {
        return <Picker.Item key={index} value={value} label={value} />
      })
      var pickerDestination =
        <Picker
          selectedValue={this.props.destinationSelected}
          onValueChange={(itemValue, itemIndex) => this.props.setDestination(itemValue)}>
          {destinationOptions}
        </Picker>
      }
    if(this.props.loadingOrigin){
      var spinnerOrigin = <Spinner style={common.spinner} type='Circle' isVisible={this.props.isVisible} size={30} />
    }

    if(this.props.loadingDestination){
      var spinnerDestination = <Spinner style={common.spinner} type='Circle' isVisible={this.props.isVisible} size={30} />
    }

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
            onChangeText={(text) => this.onChangeOriginText(text)}
            placeholder='Enter Origin...'
            underlineColorAndroid='#e9418b'
          />
          {pickerOrigin}
          {spinnerOrigin}
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
          {pickerDestination}
          {spinnerDestination}
        </View>
        <SelectScheduleTimingContainer />
        <SelectPassengersContainer />
        <FindTrainsButton navigation={this.props.navigation} />
      </ScrollView>
    </View>
    )
  }
}
