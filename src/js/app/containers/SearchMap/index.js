import { connect } from 'react-redux'

import SearchMap from './../../components/Header/Items/App/SearchMap'
import {
  getOriginSuccess,
  getOriginError,
  getDestinationSuccess,
  getDestinationError,
  setLatitudeOrigin,
  setLongitudeOrigin,
  setLatitudeDestination,
  setLongitudeDestination,
  openModalMap
} from "./../../actions/actions";

const mapStateToProps = (state, ownProps) => {
  return {

    openModalMap: state.openModalMap,
    text: state.selectedMap
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    getOriginStations: (url, body) => {
      fetch(url, body)
        .then((response) => {
          return response
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch(getOriginSuccess(Object.values(data.links)))
        })
        .catch(() => dispatch(getOriginError(true)))
    },
    getDestinationStations: (url, body) => {
      fetch(url, body)
        .then((response) => {
          return response
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch(getDestinationSuccess(Object.values(data.links)))
        })
        .catch(() => dispatch(getDestinationError(true)))
    },
    setLatitudeOrigin: (value) => {
      dispatch(setLatitudeOrigin(value))
    },
    setLongitudeOrigin: (value) => {
      dispatch(setLongitudeOrigin(value))
    },
    setLatitudeDestination: (value) => {
      dispatch(setLatitudeDestination(value))
    },
    setLongitudeDestination: (value) => {
      dispatch(setLongitudeDestination(value))
    },
    setOpenModalMap: (bool) => {
      dispatch(openModalMap(bool))
    }
  }
}

const SearchMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchMap)

export default SearchMapContainer
