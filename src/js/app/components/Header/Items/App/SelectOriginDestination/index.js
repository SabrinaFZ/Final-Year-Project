'use strict'
import React, { PropTypes, Component } from 'react'
import { ScrollView, TextInput, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'
import Spinner from 'react-native-spinkit'

import common from './../../../../../../../styles'

import SelectScheduleTimingContainer from '../../../../../containers/SelectScheduleTiming'
import SelectPassengersContainer from '../../../../../containers/SelectPassengers'
import FindTrainsButtonContainer from './../../../../../containers/FindTrainsButton'
import MapContainer from './../../../../../containers/Map'
import SearchMapContainer from './../../../../../containers/SearchMap'

export default class SelectOriginDestination extends Component {
  constructor(props){
    super(props)

    this.goMap = this.goMap.bind(this)
    this.searchOrigin = this.searchOrigin.bind(this)
    this.searchDestination = this.searchDestination.bind(this)
    this.onChangeOriginText = this.onChangeOriginText.bind(this)
    this.onChangeDestinationText = this.onChangeDestinationText.bind(this)
    this.setResultOrigin = this.setResultOrigin.bind(this)
    this.setResultDestination = this.setResultDestination.bind(this)
    this.handleValueOriginChange = this.handleValueOriginChange.bind(this)
    this.handleValueDestinationChange = this.handleValueDestinationChange.bind(this)
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
    openModalMap: PropTypes.bool.isRequired,
    selectedMap: PropTypes.string.isRequired,
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
    setOpenModalMap: PropTypes.func.isRequired,
    setSelectedMap: PropTypes.func.isRequired,
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


  componentDidUpdate(prevProps){
    if(this.props.listOrigin.length == 0 || prevProps.listOrigin !== this.props.listOrigin){
      this.setResultOrigin()
    }
    if(this.props.listDestination.length == 0 || prevProps.listDestination !== this.props.listDestination){
      this.setResultDestination()
    }
  }


  onChangeOriginText(text){
    this.props.resetListOrigin()
    if(text != ''  && text.length >= 3){
      this.props.isLoadingOrigin(true)
      this.searchOrigin(text)
      this.setResultOrigin()
    }
  }

  onChangeDestinationText(text){
    this.props.resetListDestination()
    if(text != ''  && text.length >= 3){
      this.props.isLoadingDestination(true)
      this.searchDestination(text)
      this.setResultDestination()
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
    this.forceUpdate()
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
    this.forceUpdate()
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

  goMap(type){
    this.props.setOpenModalMap(!this.props.openModalMap)
    this.props.setSelectedMap(type)
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
          <View style={common.marginTop20}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{width:'100%', backgroundColor: '#e9418b', borderTopLeftRadius: 5, borderTopRightRadius: 5}}
              onPress={() => this.goMap('origin')}>
              <View style={[common.row, common.padding5, common.paddingLeftRight20]}>
                <Icon name='search' type='EvilIcons' color='#fff'/>
                <Text style={common.textButton}>SEARCH IN THE MAP . . .</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[common.searchBar, common.marginBottom20]}>
            <TextInput
              onChangeText={(text) => this.onChangeOriginText(text)}
              placeholder='Enter Origin...'
              underlineColorAndroid='#e9418b'
              clearTextOnFocus={true}
            />
            {pickerOrigin}
            {spinnerOrigin}
          </View>

            <Text style={common.textBold}>{ 'Destination' }</Text>
            <View style={common.marginTop20}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width:'100%', backgroundColor: '#e9418b', borderTopLeftRadius: 5, borderTopRightRadius: 5}}
                onPress={() => this.goMap('destination')}>
                <View style={[common.row, common.padding5, common.paddingLeftRight20]}>
                  <Icon name='search' type='EvilIcons' color='#fff'/>
                  <Text style={common.textButton}>SEARCH IN THE MAP . . .</Text>
                </View>
              </TouchableOpacity>
            </View>
          <View style={[common.searchBar, common.marginBottom20]}>
            <TextInput
              onChangeText={(text) => this.onChangeDestinationText(text)}
              placeholder='Enter Destination...'
              underlineColorAndroid='#e9418b'
              clearTextOnFocus={true}
            />
            {pickerDestination}
            {spinnerDestination}
          </View>
          <SelectScheduleTimingContainer />
          <SelectPassengersContainer />
          <FindTrainsButtonContainer navigation={this.props.navigation} />
          <SearchMapContainer navigation={this.props.navigation} text={this.props.selectedMap}/>
        </View>
      </ScrollView>
    )
  }
}
