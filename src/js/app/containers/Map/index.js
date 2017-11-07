import { connect } from 'react-redux'

import Map from './../../components/Header/Items/App/Map'
import { setOrigin, setDestination } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    latitude: state.latitude,
    longitude: state.longitude,
    listOrigin: state.listOrigin,
    listDestination: state.listDestination,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setOrigin: (itemValue) => {
      dispatch(setOrigin(itemValue))
    },
    setDestination: (itemValue) => {
      dispatch(setDestination(itemValue))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
