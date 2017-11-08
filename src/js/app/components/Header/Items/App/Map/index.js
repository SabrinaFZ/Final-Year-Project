import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import RNGooglePlaces from 'react-native-google-places'
import MapView from 'react-native-maps'
import { Icon } from 'react-native-elements'

import common from './../../../../../../../styles'
import styles from './../../../../../../../styles/Map'

export default class Map extends Component{
  constructor(props){
    super(props)

    this.setStationSelected = this.setStationSelected.bind(this)
  }
  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    listOrigin: PropTypes.arrayOf(PropTypes.object),
    listDestination: PropTypes.arrayOf(PropTypes.object),
    selectedMap: PropTypes.string.isRequired,
    setOrigin: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired,
  }

  setStationSelected(stationName){
    if(this.props.selectedMap == 'origin'){
      this.props.setOrigin(stationName)

    } else {
      this.props.setDestination(stationName)
    }
    this.props.navigation.goBack()
  }

  componentDidUpdate(){
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

  render(){
    let markers =  null
    if(this.props.selectedMap == 'origin'){
      markers =
      this.props.listOrigin.map((marker, index) => (
        <MapView.Marker
          key={index}
          pinColor='#e9418b'
          coordinate={{
            latitude: parseFloat(marker.latitude),
            longitude: parseFloat(marker.longitude),
          }}
          title={marker.name}
          description={marker.address}
        >
          <MapView.Callout onPress={() => this.setStationSelected(marker.name)}>
            <View style={common.padding10}>
              <Text style={[common.textBold, common.textCenter]}>{marker.name}</Text>
              <Text style={common.textCenter}>Tap to select as your origin</Text>
              <Icon name='touch-app' type='MaterialIcons' size={50} color='#e9418b' />
            </View>
          </MapView.Callout>
        </MapView.Marker>
        )
      )
    } else {
      markers =
      this.props.listDestination.map((marker, index) => (
        <MapView.Marker
          key={index}
          pinColor='#e9418b'
          coordinate={{
            latitude: parseFloat(marker.latitude),
            longitude: parseFloat(marker.longitude),
          }}
          title={marker.name}
          description={marker.address}
        >
          <MapView.Callout onPress={() => this.setStationSelected(marker.name)}>
            <View style={common.padding10}>
              <Text style={[common.textBold, common.textCenter]}>{marker.name}</Text>
              <Text style={common.textCenter}>Tap to select as your destination</Text>
              <Icon name='touch-app' type='MaterialIcons' size={50} color='#e9418b' />
            </View>
          </MapView.Callout>
        </MapView.Marker>
        )
      )
    }
    return(
      <View style ={styles.container}>
        <MapView
          loadingEnabled={true}
          showsMyLocationButton={true}
          style={ styles.map }
          region={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {markers}
        </MapView>
      </View>
    )
  }
}
