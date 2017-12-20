import { connect } from 'react-redux'

import Map from './../../components/App/Map'
import { setOrigin, setDestination, openModalMap, getOriginSuccess, getDestinationSuccess } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    originSelected: state.originSelected,
    destinationSelected: state.destinationSelected,
    latitudeOrigin: state.latitudeOrigin,
    longitudeOrigin: state.longitudeOrigin,
    latitudeDestination: state.latitudeDestination,
    longitudeDestination: state.longitudeDestination,
    listOrigin: state.listOrigin,
    listDestination: state.listDestination,
    selectedMap: state.selectedMap,
  }
}

const mapDispatchToProps = dispatch =>{
  return { setOrigin: itemValue => {
      dispatch(setOrigin(itemValue));
    }, setDestination: itemValue => {
      dispatch(setDestination(itemValue));
    }, setOpenModalMap: bool => {
      dispatch(openModalMap(bool));
    }, setOriginStations: data => {
      let origin = [];
      origin.push(data);
      dispatch(getOriginSuccess(origin));
    }, setDestinationStations: data => {
      let destination = [];
      destination.push(data);
      dispatch(getDestinationSuccess(destination));
    } }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
