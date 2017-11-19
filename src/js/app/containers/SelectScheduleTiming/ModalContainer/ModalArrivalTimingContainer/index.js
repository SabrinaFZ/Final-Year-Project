import { connect } from 'react-redux'

import ModalArrivalTiming from './../../../../components/Header/Items/App/SelectScheduleTiming/Modal/ModalArrivalTiming'

import { onChangeArrivalTime, setDateTimePickerVisibleFrom, setDateTimePickerVisibleTo } from './../../../../actions/actions'

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
    onChangeArrivalTime: (date, type, rangeType) => {
      dispatch(onChangeArrivalTime(date, type, rangeType))
    },
    setDateTimePickerVisibleFrom: (bool) => {
      dispatch(setDateTimePickerVisibleFrom(bool))
    },
    setDateTimePickerVisibleTo: (bool) => {
      dispatch(setDateTimePickerVisibleTo(bool))
    }
  }
}

const ModalArrivalTimingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalArrivalTiming)

export default ModalArrivalTimingContainer
