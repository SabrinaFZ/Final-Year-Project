import { connect } from 'react-redux'

import ModalScheduleTiming from './../../../components/Header/Items/App/SelectScheduleTiming/Modal/'

import { cancelReturn, showHideModal, openOutwardModal, openReturnModal, setArrivingLeaving } from './../../../actions/actions'

const mapStateToProps =  (state, ownProps) => {
  return {
    showModal: state.showModal,
    outward: state.outward,
    returnBack: state.returnBack,
    title: ownProps.title,
    openOutward: state.openOutward,
    openReturn: state.openReturn,
    addReturn: state.addReturn,
    arrivingLeaving: state.arrivingLeaving,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelReturn: (bool) => {
      dispatch(cancelReturn(bool))
    },
    showHideModal: (bool) => {
      dispatch(showHideModal(bool))
    },
    openOutwardModal: (bool) => {
      dispatch(openOutwardModal(bool))
    },
    openReturnModal: (bool) => {
      dispatch(openReturnModal(bool))
    },
    setArrivingLeaving: (type) => {
      dispatch(setArrivingLeaving(type))
    }
  }
}

const ModalScheduleTimingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalScheduleTiming)

export default ModalScheduleTimingContainer
