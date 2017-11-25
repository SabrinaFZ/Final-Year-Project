import { connect } from 'react-redux'

import SelectScheduleTiming from './../../components/Header/Items/App/SelectScheduleTiming/'
import { openOutwardModal, openReturnModal, cancelReturn } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    openOutward: state.openOutward,
    openReturn: state.openReturn,
    addReturn: state.addReturn,
    outward: state.outward,
    return: state.returnBack
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openOutwardModal: (bool) => {
      dispatch(openOutwardModal(bool))
    },
    openReturnModal: (bool) => {
      dispatch(openReturnModal(bool))
    },
    cancelReturn: (bool) => {
      dispatch(cancelReturn(bool))
    }
  }
}


const SelectScheduleTimingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectScheduleTiming)


export default SelectScheduleTimingContainer
