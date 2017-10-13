import { connect } from 'react-redux'

import SelectAdults from './../../../components/Header/Items/App/SelectPassengers/SelectAdults'

import { changeAdultNumber } from './../../../actions/actions'

const mapStateToProps = state => {
  return {
    adults: state.adults,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAdultNumber: (number) => {
      dispatch(changeAdultNumber(number))
    },
  }
}

const SelectAdultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectAdults)

export default SelectAdultsContainer
