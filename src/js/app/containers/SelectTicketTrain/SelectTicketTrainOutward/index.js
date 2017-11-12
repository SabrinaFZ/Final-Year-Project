import { connect } from 'react-redux'

import SelectTicketTrainOutward from './../../../components/Header/Items/App/SelectTicketTrain/SelectTicketTrainOutward'

import { setOutwardReturn, setOpenMoreTicketsOutwardId, setOpenMoreTicketsOutward, selectedOutward, openModalInfoOutward, setOpenModalInfoOutwardId } from './../../../actions/actions'

const mapStateToProps = state => {
  return {
    originSelected: state.originSelected,
    destinationSelected: state.destinationSelected,
    outward: state.outward,
    returnBack: state.returnBack,
    listOrigin: state.listOrigin,
    listDestination: state.listDestination,
    addReturn: state.addReturn,
    journeyPlan: state.journeyPlan,
    outwardReturn: state.outwardReturn,
    openMoreTicketsOutwardId: state.openMoreTicketsOutwardId,
    openMoreTicketsOutward: state.openMoreTicketsOutward,
    openModalInfoOutward: state.openModalInfoOutward,
    openModalInfoOutwardId: state.openModalInfoOutwardId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOutwardReturn: (value) => {
      dispatch(setOutwardReturn(value))
    },
    setOpenMoreTicketsOutwardId: (id) => {
      dispatch(setOpenMoreTicketsOutwardId(id))
    },
    setOpenMoreTicketsOutward: (bool) => {
      dispatch(setOpenMoreTicketsOutward(bool))
    },
    selectedOutward: (value) => {
      dispatch(selectedOutward(value))
    },
    setOpenModalInfoOutward: (bool) => {
      dispatch(openModalInfoOutward(bool))
    },
    setOpenModalInfoOutwardId: (value) => {
      dispatch(setOpenModalInfoOutwardId(value))
    }
  }
}

const SelectTicketTrainOutwardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTicketTrainOutward)

export default SelectTicketTrainOutwardContainer
