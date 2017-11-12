import { connect } from 'react-redux'

import DetailsTicketsOutward from './../../../components/Header/Items/App/DetailsTickets/DetailsTicketsOutward'

import { openModalInfoOutward } from './../../../actions/actions'

const mapStateToProps = (state) => {
  return {
    selectedOutward: state.selectedOutward,
    journeyPlan: state.journeyPlan,
    openModalInfoOutward: state.openModalInfoOutward,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOpenModalInfoOutward: (bool) => {
      dispatch(openModalInfoOutward(bool))
    }
  }
}

const DetailsTicketsOutwardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsTicketsOutward)

export default DetailsTicketsOutwardContainer
