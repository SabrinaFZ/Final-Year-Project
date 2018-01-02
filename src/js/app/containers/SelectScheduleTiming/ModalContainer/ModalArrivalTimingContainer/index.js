import { connect } from 'react-redux'

import ModalArrivalTiming from './../../../../components/App/SelectScheduleTiming/Modal/ModalArrivalTiming'

import { onChangeArrivalTime } from './../../../../actions/actions'

const mapStateToProps =  (state, ownProps) => {
  return {
    type: ownProps.type,
    rangeStart: ownProps.rangeStart,
    rangeEnd: ownProps.rangeEnd,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeArrivalTime: (date, type, rangeType) => {
      dispatch(onChangeArrivalTime(date, type, rangeType))
    }
  }
}

const ModalArrivalTimingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalArrivalTiming)

export default ModalArrivalTimingContainer
