'use strict'
import React, { PropTypes } from 'react'
import { ScrollView, TimePickerAndroid, DatePickerAndroid, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'
import Spinner from 'react-native-spinkit'
import RNGooglePlaces from 'react-native-google-places'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView from 'react-native-maps'

import common from './../../../../../../../styles'
import welcome from '../../../../../../../styles'

import SelectScheduleTimingContainer from '../../../../../containers/SelectScheduleTiming'
import SelectPassengersContainer from '../../../../../containers/SelectPassengers'
import FindTrainsButtonContainer from './../../../../../containers/FindTrainsButton'
import MapContainer from './../../../../../containers/Map'
//import SearchMap from './../SearchMap'

export default class SelectOriginDestination extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      openMap: false
    }
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
    addCart: PropTypes.bool.isRequired,
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
    resetAll: PropTypes.func.isRequired,
    getOriginStations: PropTypes.func.isRequired,
    setLatitude: PropTypes.func.isRequired,
    setLongitude: PropTypes.func.isRequired,
  }

  componentWillMount(){
    if(this.props.addCart){
      this.props.resetAll()
    }
  }

  componentDidMount(){
    if(this.props.addCart){
      this.props.resetAll()

    }
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

  async getOriginStations(latitude, longitude){
    let baseURL = `https://api.thameslinkrailway.com/config/stations?latitude=${latitude}&longitude=${longitude}&num_stations=5`
    await this.props.getOriginStations(baseURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  goMap(){
    this.setState({
      openMap: true
    })
    // RNGooglePlaces.openAutocompleteModal({
    //   type: 'geocode',
  	//   country: 'GB',
    // })
    // .then((place) => {
		//     console.log(place)
    //     this.props.setLatitude(place.latitude)
    //     this.props.setLongitude(place.longitude)
    //     this.getOriginStations(place.latitude, place.longitude)
    //     this.props.navigation.navigate('Map')
    //     //this.props.setOrigin(place.name)
    // })
    // .catch(error => console.log(error.message));
  }

  handleValueOriginChange(itemValue, itemIndex){
    if(itemIndex != 0){
      this.props.setOrigin(itemValue)
    }
  }

  handleValueDestinationChange(itemValue, itemIndex){
    if(itemIndex != 0){
      this.props.setDestination(itemValue)
    }
  }


  render(){
    if((this.props.resultOrigin).length != 0){
      var originOptions = (this.props.resultOrigin).map( (value, index) => {
        return <Picker.Item key={index} value={value} label={value} />
      })
      var pickerOrigin =
        <Picker
          selectedValue={this.props.originSelected}
          onValueChange={(itemValue, itemIndex) => this.handleValueOriginChange(itemValue, itemIndex)}>
          <Picker.Item value='Select an Origin' label='Select an Origin' />
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
          onValueChange={(itemValue, itemIndex) => this.handleValueDestinationChange(itemValue, itemIndex)}>
          <Picker.Item value='Select a Destination' label='Select a Destination' />
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
      <ScrollView>
        <View style={[common.container, common.start, common.padding40]}>
          <Text style={common.textBold}>{ 'Origin' }</Text>
          <View style={common.row}>
            <Icon name='search' type='EvilIcons' />
            <TextInput
              style={common.input}
              onFocus={this.goMap.bind(this)}
              placeholder='Search in the map...'
              underlineColorAndroid='#e9418b'
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
                onFocus={this.goMap.bind(this)}
                placeholder='Search in the map...'
                underlineColorAndroid='#e9418b'
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
          <FindTrainsButtonContainer navigation={this.props.navigation} />
          <Modal
           animationType="slide"
           transparent={false}
           visible={this.state.openMap}
           onRequestClose={() => this.setState({
             openMap: false
           })}
           >
          <View style={[common.container, common.justifyContent, common.padding40, common.paddingLeftRight40]}>
            <ScrollView>
              <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                listViewDisplayed='auto'
                fetchDetails={true}
                renderDescription={row => row.description}
                onPress={(data, details = null) => {
                  console.log(data, details)
                  this.props.setLatitude(details.geometry.location.lat)
                  this.props.setLongitude(details.geometry.location.lng)
                  this.getOriginStations(details.geometry.location.lat, details.geometry.location.lng)
                  this.setState({
                    openMap: false
                  })
                  this.props.navigation.navigate('Map')
                }}
                getDefaultValue={() => ''}
                query={{
                  key: 'AIzaSyD3g40E3xMy3PhXoZbIRFz9FEx_w7vcOrA',
                  language: 'en',
                  types: 'geocode',
                  components: 'country:gb'
                }}
                currentLocation={true}
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch'
                />
              </ScrollView>
            </View>
          </Modal>
        </View>
      </ScrollView>
    )
  }
}
