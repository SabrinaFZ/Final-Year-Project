import { connect } from 'react-redux'

import ModalDepartureTiming from './../../../../components/Header/Items/App/SelectScheduleTiming/Modal/ModalDepartureTiming'

import { onChangeDepartureDateTime } from './../../../../actions/actions'

const mapStateToProps =  (state, ownProps) => {
  return {
    type: ownProps.type,
    rangeStart: ownProps.rangeStart,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeDepartureDateTime: (date, type) => {
      dispatch(onChangeDepartureDateTime(date, type))
    }
  }
}

const ModalDepartureTimingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDepartureTiming)

export default ModalDepartureTimingContainer
