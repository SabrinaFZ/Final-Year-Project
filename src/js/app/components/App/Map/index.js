import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import MapView from 'react-native-maps'
import { Icon } from 'react-native-elements'

import SearchMapContainer from './../../../containers/SearchMap'

import common from './../../../../../styles'
import styles from './../../../../../styles/Map'

export default class Map extends Component{
  constructor(props){
    super(props)
    
    this.setStationSelected = this.setStationSelected.bind(this)
  }
  static propTypes = {
    originSelected: PropTypes.string.isRequired,
    destinationSelected: PropTypes.string.isRequired,
    latitudeOrigin: PropTypes.number.isRequired,
    longitudeOrigin: PropTypes.number.isRequired,
    latitudeDestination: PropTypes.number.isRequired,
    longitudeDestination: PropTypes.number.isRequired,
    listOrigin: PropTypes.arrayOf(PropTypes.object),
    listDestination: PropTypes.arrayOf(PropTypes.object),
    selectedMap: PropTypes.string.isRequired,
    setOrigin: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired,
    setOpenModalMap: PropTypes.func.isRequired,
    setOriginStations: PropTypes.func.isRequired,
    setDestinationStations: PropTypes.func.isRequired
  }

  setStationSelected(station){
    if(this.props.selectedMap == 'origin'){
      this.props.setOrigin(station.name)
      this.props.setOriginStations(station)

    } else {
      this.props.setDestination(station.name)
      this.props.setDestinationStations(station)
    }
    this.forceUpdate()
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.selectedMap == 'origin' && (nextProps.listOrigin == this.props.listOrigin )){
      return false
    }
    if (this.props.selectedMap == "destination" && nextProps.listDestination == this.props.listDestination) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.selectedMap == 'origin' && this.props.listOrigin.length == 0){
      Alert.alert(
        'Ups!',
        'No trains found in selected zone',
        [
          {text: 'Try Again', onPress: () => this.props.navigation.goBack()},
        ],
        { cancelable: false }
      )
    } else {
      if(this.props.selectedMap == 'destination' && this.props.listDestination.length == 0){
        Alert.alert(
          'Ups!',
          'No trains found in selected zone',
          [
            {text: 'Try Again', onPress: () => this.props.navigation.goBack()},
          ],
          { cancelable: false }
        )
      }
    }
  }

  openSearchModal() {
    this.props.setOpenModalMap(!this.props.openModalMap);
  }

  render(){
    let latitute, longitude = 0
    let markers = null
    if(this.props.selectedMap == 'origin'){
      latitude = this.props.latitudeOrigin,
      longitude = this.props.longitudeOrigin
    }else{
      latitude = this.props.latitudeDestination,
      longitude = this.props.longitudeDestination
    }
    if (this.props.selectedMap == "origin") {
      markers = this.props.listOrigin.map((marker, index) => (
          <MapView.Marker
            key={index}
            pinColor="#e9418b"
            coordinate={{
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude)
            }}
            title={marker.name}
            description={marker.address}
          >
            <MapView.Callout
              onPress={() => this.setStationSelected(marker)}
            >
              <View style={common.padding10}>
                {this.props.originSelected !== marker.name ?
                <View>
                  <Text style={[common.textBold, common.textCenter]}>
                  {marker.name}
                  </Text>
                </View>
                :
                <View>
                  <Text style={[common.textBold, common.textCenter]}>
                  Selected Origin
                    </Text>
                    <Text style={[common.input, common.textCenter]}>
                  {marker.name}
                    </Text>
                </View>
                }
                {
                this.props.originSelected !== marker.name ?
                <View>
                  <Text style={common.textCenter}>
                    Tap to select as your origin
                  </Text>
                  <Icon
                    name="touch-app"
                    type="MaterialIcons"
                    size={50}
                    color="#e9418b"
                  />
                </View>
              : null }
              </View>
            </MapView.Callout>
          </MapView.Marker>
        ));
    } 
    else {
      markers = 
      this.props.listDestination.map(
        (marker, index) => {
          if(!marker.name.includes('Travelcard')){
            return <MapView.Marker key={index} pinColor="#e9418b" coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }} title={marker.name} description={marker.address}>
              <MapView.Callout onPress={() => this.setStationSelected(marker)}>
                <View style={common.padding10}>
                  {this.props.destinationSelected !== marker.name ?
                <View>
                  <Text style={[common.textBold, common.textCenter]}>
                  {marker.name}
                  </Text>
                </View>
                :
                <View>
                  <Text style={[common.textBold, common.textCenter]}>
                  Selected Destination
                    </Text>
                    <Text style={[common.input, common.textCenter]}>
                  {marker.name}
                    </Text>
                </View>
                }
                {
                this.props.destinationSelected !== marker.name ?
                <View>
                  <Text style={common.textCenter}>
                    Tap to select as your destination
                  </Text>
                  <Icon
                    name="touch-app"
                    type="MaterialIcons"
                    size={50}
                    color="#e9418b"
                  />
                </View>
              : null }
                </View>
              </MapView.Callout>
            </MapView.Marker>;
          }
        })
    }
    return <View style={styles.container}>
        <MapView loadingEnabled={true} showsMyLocationButton={true} style={styles.map} region={{ latitude: latitude, longitude: longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
          {markers}
        </MapView>
        <TouchableOpacity activeOpacity={0.8} style={[common.buttonInfo, common.padding5]} onPress={() => this.openSearchModal()}>
          <Text style={common.textButton}> PICK A PLACE </Text>
        </TouchableOpacity>
        <SearchMapContainer navigation={this.props.navigation} />
      </View>;
  }
}
