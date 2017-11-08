import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native'
import { Icon } from 'react-native-elements'
import MapView from 'react-native-maps'

import common from './../../../../../../../../styles'
import styles from './../../../../../../../../styles/Map'

export default class InfoModal extends Component {
  constructor(props){
    super(props)

    this.getTrainsName = this.getTrainsName.bind(this)
    this.getTrainsLatitude = this.getTrainsLatitude.bind(this)
    this.getTrainsLongitude = this.getTrainsLongitude.bind(this)
  }

  static propTypes = {
    journeyPlan: PropTypes.object.isRequired,
    openModalInfo: PropTypes.bool.isRequired,
    routeTrains: PropTypes.arrayOf(PropTypes.object),
    setOpenModalInfo: PropTypes.func.isRequired
  }

  getTrainsLatitude(trainId){
    let station = this.props.journeyPlan.links[trainId]
    return station.latitude
  }

  getTrainsLongitude(trainId){
    let station = this.props.journeyPlan.links[trainId]
    return station.longitude
  }

  getTrainsName(trainId){
    let station = this.props.journeyPlan.links[trainId]
    return station.name
  }

  render(){
    let array = []
    this.props.routeTrains.map((marker, index) => {
      array.push(
        {
          latitude: this.getTrainsLatitude(marker.origin[0].station),
          longitude: this.getTrainsLongitude(marker.origin[0].station),
        },
        {
          latitude: this.getTrainsLatitude(marker.destination[0].station),
          longitude: this.getTrainsLongitude(marker.destination[0].station),
        }
      )
    })
    return(
      <View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.props.openModalInfo}
          onRequestClose={() => this.props.setOpenModalInfo(false)}
          >
            <View style ={styles.container}>
              <MapView
                region={{
                  latitude: parseFloat(this.getTrainsLatitude(this.props.routeTrains[0].origin[0].station)),
                  longitude: parseFloat(this.getTrainsLongitude(this.props.routeTrains[0].origin[0].station)),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                loadingEnabled={true}
                showsMyLocationButton={true}
                style={ styles.map }>
                  <MapView.Marker
                    pinColor='#e9418b'
                    coordinate={{
                      latitude: parseFloat(this.getTrainsLatitude(this.props.routeTrains[this.props.routeTrains.length -1 ].destination[0].station)),
                      longitude: parseFloat(this.getTrainsLongitude(this.props.routeTrains[this.props.routeTrains.length -1 ].destination[0].station)),
                    }}
                    title={this.getTrainsName(this.props.routeTrains[this.props.routeTrains.length -1 ].destination[0].station)}
                  />
                <MapView.Polyline
                    coordinates={array}
                    strokeWidth={4}
                    strokeColor='#e9418b'>
                </MapView.Polyline>
              </MapView>
            </View>
       </Modal>
      </View>
    )
  }
}
