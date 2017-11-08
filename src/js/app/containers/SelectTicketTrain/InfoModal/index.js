import { connect } from 'react-redux'

import InfoModal from './../../../components/Header/Items/App/SelectTicketTrain/InfoModal'

import { openModalInfoOutward } from './../../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    journeyPlan: state.journeyPlan,
    openModalInfoOutward: state.openModalInfoOutward,
    routeTrains: ownProps.routeTrains
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOpenModalInfoOutward: (bool) => {
      dispatch(openModalInfoOutward(bool))
    }
  }
}

const InfoModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoModal)

export default InfoModalContainer
