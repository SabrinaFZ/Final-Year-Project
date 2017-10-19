import { connect } from 'react-redux'

import SelectOriginDestination from './../../components/Header/Items/App/SelectOriginDestination'
import { setOrigin, setDestination, getOriginSuccess, error, resetListOrigin, getDestinationSuccess, resetListDestination, setResultOrigin, setResultDestination } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    listOrigin: state.listOrigin,
    listDestination: state.listDestination,
    originSelected: state.originSelected,
    destinationSelected: state.destinationSelected,
    resultOrigin: state.resultOrigin,
    resultDestination: state.resultDestination,
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
        .catch(() => dispatch(error(true)))
    },
    getDestination: (url, body) => {
      fetch(url, body)
        .then((response) => {
          return response
        })
        .then((response) => response.json())
        .then((data) => Object.keys(data).forEach(function(k) {
          dispatch(getDestinationSuccess(data[k]))
        }))
        .catch(() => dispatch(error(true)))
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
    }
  }
}

const SelectOriginDestinationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOriginDestination)

export default SelectOriginDestinationContainer
