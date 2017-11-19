import { connect } from 'react-redux'

import ModalDepartureTiming from './../../../../components/Header/Items/App/SelectScheduleTiming/Modal/ModalDepartureTiming'

import { onChangeDepartureTime, setDateTimePickerVisibleFrom, setDateTimePickerVisibleTo } from './../../../../actions/actions'

const mapStateToProps =  (state, ownProps) => {
  return {
    isDateTimePickerVisibleFrom: state.isDateTimePickerVisibleFrom,
    isDateTimePickerVisibleTo: state.isDateTimePickerVisibleTo,
    type: ownProps.type,
    rangeStart: ownProps.rangeStart,
    rangeEnd: ownProps.rangeEnd,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeDepartureTime: (date, type, rangeType) => {
      dispatch(onChangeDepartureTime(date, type, rangeType))
    },
    setDateTimePickerVisibleFrom: (bool) => {
      dispatch(setDateTimePickerVisibleFrom(bool))
    },
    setDateTimePickerVisibleTo: (bool) => {
      dispatch(setDateTimePickerVisibleTo(bool))
    }
  }
}

const ModalDepartureTimingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDepartureTiming)

export default ModalDepartureTimingContainer
