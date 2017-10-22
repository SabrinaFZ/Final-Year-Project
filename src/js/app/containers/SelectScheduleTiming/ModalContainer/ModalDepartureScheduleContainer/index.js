import { connect } from 'react-redux'

import ModalDepartureSchedule from './../../../../components/Header/Items/App/SelectScheduleTiming/Modal/ModalDepartureSchedule'

import { onChangeDepartureDateTime } from './../../../../actions/actions'

const mapStateToProps =  (state, ownProps) => {
  return {
    type: ownProps.type,
    rangeStart: ownProps.rangeStart,
    rangeEnd: ownProps.rangeEnd,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeDepartureDateTime: (dateStart, dateEnd, type) => {
      dispatch(onChangeDepartureDateTime(dateStart, dateEnd, type))
    }
  }
}

const ModalDepartureScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDepartureSchedule)

export default ModalDepartureScheduleContainer
