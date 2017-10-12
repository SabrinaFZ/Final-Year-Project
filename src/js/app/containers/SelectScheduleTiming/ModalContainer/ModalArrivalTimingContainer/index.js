import { connect } from 'react-redux'

import ModalArrivalTiming from './../../../../components/Header/Items/App/SelectScheduleTiming/Modal/ModalArrivalTiming'

import { onChangeArrivalDateTime } from './../../../../actions/actions'

const mapStateToProps =  (state, ownProps) => {
  return {
    type: ownProps.type,
    rangeEnd: ownProps.rangeEnd,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeArrivalDateTime: (date, type) => {
      dispatch(onChangeArrivalDateTime(date, type))
    }
  }
}

const ModalArrivalTimingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalArrivalTiming)

export default ModalArrivalTimingContainer
