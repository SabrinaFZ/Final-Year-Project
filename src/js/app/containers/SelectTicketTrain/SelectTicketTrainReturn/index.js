import { connect } from 'react-redux'

import SelectTicketTrainReturn from './../../../components/Header/Items/App/SelectTicketTrain/SelectTicketTrainReturn'

import { setOutwardReturn, setOpenMoreTicketsReturnId, setOpenMoreTicketsReturn, selectedOutward, selectedReturn, openModalInfoReturn, setOpenModalInfoReturnId } from './../../../actions/actions'

const mapStateToProps = state => {
  return {
    originSelected: state.originSelected,
    destinationSelected: state.destinationSelected,
    returnBack: state.returnBack,
    listOrigin: state.listOrigin,
    listDestination: state.listDestination,
    journeyPlan: state.journeyPlan,
    outwardReturn: state.outwardReturn,
    openMoreTicketsReturnId: state.openMoreTicketsReturnId,
    openMoreTicketsReturn: state.openMoreTicketsReturn,
    openModalInfoReturnId: state.openModalInfoReturnId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOutwardReturn: (value) => {
      dispatch(setOutwardReturn(value))
    },
    setOpenMoreTicketsReturnId: (id) => {
      dispatch(setOpenMoreTicketsReturnId(id))
    },
    setOpenMoreTicketsReturn: (bool) => {
      dispatch(setOpenMoreTicketsReturn(bool))
    },
    selectedOutward: (value) => {
      dispatch(selectedOutward(value))
    },
    selectedReturn: (value) => {
      dispatch(selectedReturn(value))
    },
    setOpenModalInfoReturn: (bool) => {
      dispatch(openModalInfoReturn(bool))
    },
    setOpenModalInfoReturnId: (value) => {
      dispatch(setOpenModalInfoReturnId(value))
    }
  }
}

const SelectTicketTrainReturnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTicketTrainReturn)

export default SelectTicketTrainReturnContainer
