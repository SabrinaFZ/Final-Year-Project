import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import RNGooglePlaces from 'react-native-google-places'
import MapView from 'react-native-maps'
import { Icon } from 'react-native-elements'

import common from './../../../../../../../styles'

export default class Map extends Component{
  constructor(props){
    super(props)

    this.setOriginSelected = this.setOriginSelected.bind(this)
  }
  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    listOrigin: PropTypes.arrayOf(PropTypes.object),
    listDestination: PropTypes.arrayOf(PropTypes.object),
    setOrigin: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired
  }

  setOriginSelected(stationName){
    this.props.setOrigin(stationName)
    this.props.navigation.navigate('SelectOriginDestination')
  }

  render(){
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
          {this.props.listOrigin.map((marker, index) => (
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
              <MapView.Callout onPress={() => this.setOriginSelected(marker.name)}>
                <View style={common.padding10}>
                  <Text style={[common.textBold, common.textCenter]}>{marker.name}</Text>
                  <Text style={common.textCenter}>Tap to select as your origin</Text>
                  <Icon name='touch-app' type='MaterialIcons' size={50} color='#e9418b' />
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
