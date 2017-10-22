import { connect } from 'react-redux'

import ModalDepartureTiming from './../../../../components/Header/Items/App/SelectScheduleTiming/Modal/ModalDepartureTiming'

import { onChangeDepartureTime } from './../../../../actions/actions'

const mapStateToProps =  (state, ownProps) => {
  return {
    type: ownProps.type,
    rangeStart: ownProps.rangeStart,
    rangeEnd: ownProps.rangeEnd,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeDepartureTime: (date, type, rangeType) => {
      dispatch(onChangeDepartureTime(date, type, rangeType))
    }
  }
}

const ModalDepartureTimingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDepartureTiming)

export default ModalDepartureTimingContainer
