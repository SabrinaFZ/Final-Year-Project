import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import RNGooglePlaces from 'react-native-google-places'
import MapView from 'react-native-maps'

import common from './../../../../../../../styles'

export default class Map extends Component{
  constructor(props){
    super(props)
  }
  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    listOrigin: PropTypes.arrayOf(PropTypes.object),
    listDestination: PropTypes.arrayOf(PropTypes.object),
  }
  render(){
    return(
      <View style ={styles.container}>
        <MapView
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
              coordinate={{
                latitude: parseFloat(marker.latitude),
                longitude: parseFloat(marker.longitude),
              }}
              title={marker.name}
              description={marker.address}
            />
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
