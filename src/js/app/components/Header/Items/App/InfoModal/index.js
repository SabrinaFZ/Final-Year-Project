import React, { Component, PropTypes } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native'
import { Icon } from 'react-native-elements'
import MapView from 'react-native-maps'
import DrawerLayout from 'react-native-drawer-layout'

import common from './../../../../../../../styles'
import styles from './../../../../../../../styles/Map'

export default class InfoModal extends Component {
  constructor(props){
    super(props)

    this.getTrainsName = this.getTrainsName.bind(this)
    this.getTrainsLatitude = this.getTrainsLatitude.bind(this)
    this.getTrainsLongitude = this.getTrainsLongitude.bind(this)
    this.handleOnRequestClose = this.handleOnRequestClose.bind(this)
  }

  static propTypes = {
    journeyPlan: PropTypes.object.isRequired,
    openModalInfoOutward: PropTypes.bool.isRequired,
    routeTrains: PropTypes.arrayOf(PropTypes.object),
    setOpenModalInfoOutward: PropTypes.func.isRequired,
    setOpenModalInfoReturn: PropTypes.func.isRequired,
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

  openDrawer() {
    this.drawer.openDrawer()
  }

  closeDrawer() {
    this.drawer.closeDrawer()
  }

  handleOnRequestClose(){
    if(this.props.openModalInfoOutward){
      this.props.setOpenModalInfoOutward(false)
    } else{
      this.props.setOpenModalInfoReturn(false)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.openModalInfoOutward || nextProps.openModalInfoReturn){
      return false
    } else {
      return true
    }
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
    const width = Dimensions.get('window').width - 80;
    const navigationView = (
     <ScrollView>
      <View style={common.alignItems}>
        {this.props.routeTrains.map((marker, index) => {
          return (
            <View key={index} style={common.paddingTop20}>
              <Text style={common.textBold}>{this.getTrainsName(marker.origin[0].station)}</Text>
              <Icon name='arrow-bold-down' type='entypo' color='#585858' iconStyle={common.paddingTop20} size={50}/>
            </View>
          )
        })}
        <View style={common.paddingTopBottom20}>
          <Text style={common.textBold}>{this.getTrainsName(this.props.routeTrains[this.props.routeTrains.length -1 ].destination[0].station)}</Text>
        </View>
      </View>
     </ScrollView>
   )
    return(
      <View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.props.openModalInfoOutward || this.props.openModalInfoReturn}
          onRequestClose={() => this.handleOnRequestClose()}
          >
            <DrawerLayout
              drawerBackgroundColor='rgba(255, 255, 255, 1)'
              drawerLockMode='unlocked'
      	      drawerWidth={width}
      	      drawerPosition={DrawerLayout.positions.Left}
      	      renderNavigationView={() => navigationView}
              ref={drawer => { return (this.drawer = drawer)}}
              >
              <View style ={styles.container}>
                <MapView
                  region={{
                    latitude: parseFloat(this.getTrainsLatitude(this.props.routeTrains[0].origin[0].station)),
                    longitude: parseFloat(this.getTrainsLongitude(this.props.routeTrains[0].origin[0].station)),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  zoomEnabled={true}
                  loadingEnabled={true}
                  showsMyLocationButton={true}
                  cacheEnabled={false}
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
                <TouchableOpacity activeOpacity={0.8} style={[common.buttonInfo, common.padding5]} onPress={() => this.openDrawer()}>
                  <Text style={common.textButton}> SHOW INFO </Text>
                </TouchableOpacity>
              </View>
            </DrawerLayout>
       </Modal>
      </View>
    )
  }
}
