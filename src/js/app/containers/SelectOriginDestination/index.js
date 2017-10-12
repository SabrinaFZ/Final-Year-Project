import { connect } from 'react-redux'

import SelectOriginDestination from './../../components/Header/Items/App/SelectOriginDestination'
import { post, setOrigin, setDestination } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    listOrigin: state.listOrigin,
    listDestination: state.listDestination,
    originSelected: state.originSelected,
    destinationSelected: state.destinationSelected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    post: (url, body) => {
      dispatch(post(url, body))
    },
    setOrigin: (itemValue) => {
      dispatch(setOrigin(itemValue))
    },
    setDestination: (itemValue) => {
      dispatch(setDestination(itemValue))
    },
  }
}

const SelectOriginDestinationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOriginDestination)

export default SelectOriginDestinationContainer
