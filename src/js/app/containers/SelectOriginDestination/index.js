import { connect } from 'react-redux'

import SelectOriginDestination from './../../components/Header/Items/App/SelectOriginDestination'
import { setOrigin, setDestination, getOriginSuccess, error, getOriginError, getDestinationError, resetListOrigin, getDestinationSuccess, resetListDestination, setResultOrigin, setResultDestination, isLoadingOrigin, isLoadingDestination, resetAll, openModalMap, selectedMap, setLatitudeOrigin, setLatitudeDestination, setLongitudeDestination, setLongitudeOrigin} from './../../actions/actions'

const mapStateToProps = state => {
  return {
    listOrigin: state.listOrigin,
    listDestination: state.listDestination,
    originSelected: state.originSelected,
    destinationSelected: state.destinationSelected,
    resultOrigin: state.resultOrigin,
    resultDestination: state.resultDestination,
    loadingOrigin: state.loadingOrigin,
    loadingDestination: state.loadingDestination,
    addCart: state.addCart,
    openModalMap: state.openModalMap,
    selectedMap: state.selectedMap,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOrigin: (itemValue) => {
      dispatch(setOrigin(itemValue))
    },
    setDestination: (itemValue) => {
      dispatch(setDestination(itemValue))
    },
    getOrigin: (url, body) => {
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
    getDestination: (url, body) => {
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
    resetListOrigin: () => {
      dispatch(resetListOrigin())
    },
    resetListDestination: () => {
      dispatch(resetListDestination())
    },
    setResultOrigin: (data) => {
      dispatch(setResultOrigin(data))
    },
    setResultDestination: (data) => {
      dispatch(setResultDestination(data))
    },
    isLoadingOrigin: (bool) => {
      dispatch(isLoadingOrigin(bool))
    },
    isLoadingDestination: (bool) => {
      dispatch(isLoadingDestination(bool))
    },
    resetAll: () => {
      dispatch(resetAll())
    },
    setOpenModalMap: (bool) => {
      dispatch(openModalMap(bool))
    },
    setSelectedMap: (value) => {
      dispatch(selectedMap(value))
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
    setListOrigin: (data) => {
      dispatch(getOriginSuccess(data))
    },
    setListDestination: (data) => {
      dispatch(getDestinationSuccess(data))
    }
  }
}

const SelectOriginDestinationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOriginDestination)

export default SelectOriginDestinationContainer
