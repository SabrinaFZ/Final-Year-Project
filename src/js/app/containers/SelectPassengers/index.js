import { connect } from 'react-redux'

import SelectPassengers from './../../components/App/SelectPassengers/'

import { showHidePassengers } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    adults: state.adults,
    childrenNumber: state.children,
    openPassengers: state.openPassengersModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleRequestClose: (bool) => {
      dispatch(showHidePassengers(bool))
    },
    openPassengersModal: (bool) => {
      dispatch(showHidePassengers(bool))
    }
  }
}

const SelectPassengersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPassengers)

export default SelectPassengersContainer
