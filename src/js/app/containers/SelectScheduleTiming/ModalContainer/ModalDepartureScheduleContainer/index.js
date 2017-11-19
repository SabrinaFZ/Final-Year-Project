import { connect } from 'react-redux'

import ModalDepartureSchedule from './../../../../components/Header/Items/App/SelectScheduleTiming/Modal/ModalDepartureSchedule'

import { onChangeDepartureDateTime, setDateTimePickerVisible } from './../../../../actions/actions'

const mapStateToProps =  (state, ownProps) => {
  return {
    isDateTimePickerVisible: state.isDateTimePickerVisible,
    type: ownProps.type,
    rangeStart: ownProps.rangeStart,
    rangeEnd: ownProps.rangeEnd,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeDepartureDateTime: (dateStart, dateEnd, type) => {
      dispatch(onChangeDepartureDateTime(dateStart, dateEnd, type))
    },
    setDateTimePickerVisible: (bool) => {
      dispatch(setDateTimePickerVisible(bool))
    }
  }
}

const ModalDepartureScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDepartureSchedule)

export default ModalDepartureScheduleContainer
