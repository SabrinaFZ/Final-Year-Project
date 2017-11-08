import { connect } from 'react-redux'

import SearchMap from './../../components/Header/Items/App/SearchMap'
import { getOriginSuccess, getOriginError, getDestinationSuccess, getDestinationError, setLatitude, setLongitude, openModalMap } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    openModalMap: state.openModalMap,
    text: ownProps.text
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
    setLatitude: (value) => {
      dispatch(setLatitude(value))
    },
    setLongitude: (value) => {
      dispatch(setLongitude(value))
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
