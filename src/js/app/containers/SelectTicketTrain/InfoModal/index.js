import { connect } from 'react-redux'

import InfoModal from './../../../components/Header/Items/App/SelectTicketTrain/InfoModal'

import { openModalInfo } from './../../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    journeyPlan: state.journeyPlan,
    openModalInfo: state.openModalInfo,
    routeTrains: ownProps.routeTrains
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOpenModalInfo: (bool) => {
      dispatch(openModalInfo(bool))
    }
  }
}

const InfoModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoModal)

export default InfoModalContainer
