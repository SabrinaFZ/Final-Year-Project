import { connect } from 'react-redux'

import DetailsTicketsReturn from './../../../components/Header/Items/App/DetailsTickets/DetailsTicketReturn'

import { openModalInfoReturn} from './../../../actions/actions'

const mapStateToProps = (state) => {
  return {
    selectedReturn: state.selectedReturn,
    journeyPlan: state.journeyPlan,
    openModalInfoReturn: state.openModalInfoReturn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOpenModalInfoReturn: (bool) => {
      dispatch(openModalInfoReturn(bool))
    }
  }
}

const DetailsTicketsReturnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsTicketsReturn)

export default DetailsTicketsReturnContainer
