import { connect } from 'react-redux'

import ModalArrivalSchedule from './../../../../components/Header/Items/App/SelectScheduleTiming/Modal/ModalArrivalSchedule'

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

const ModalArrivalScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalArrivalSchedule)

export default ModalArrivalScheduleContainer
