import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import RNGooglePlaces from 'react-native-google-places'

export default class MySettings extends Component {
  constructor(props){
    super(props)
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal({
      type: 'establishment',
  	  country: 'CA',
  	  latitude: 53.544389,
  	  longitude: -113.490927,
  	  radius: 10
    })
    .then((place) => {
		console.log(place);
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  // render() {
  //   return (
  //     <View style ={styles.container}>
  //       <MapView
  //         style={ styles.map }
  //         initialRegion={{
  //           latitude: 37.78825,
  //           longitude: -122.4324,
  //           latitudeDelta: 0.0922,
  //           longitudeDelta: 0.0421,
  //         }}
  //       />
  //     </View>
  //   )
  // }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}
        >
          <Text>Pick a Place</Text>
        </TouchableOpacity>
      </View>
    );
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
});
