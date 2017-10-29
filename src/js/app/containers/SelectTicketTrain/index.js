import { connect } from 'react-redux'

import SelectTicketTrain from './../../components/Header/Items/App/SelectTicketTrain'

import { error, postSuccess, isLoadingTrains, setOutwardReturn, setOpenMoreTicketsOutwardId, setOpenMoreTicketsOutward, setOpenMoreTicketsReturnId, setOpenMoreTicketsReturn, selectedOutward, selectedReturn } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    originSelected: state.originSelected,
    destinationSelected: state.destinationSelected,
    outward: state.outward,
    returnBack: state.returnBack,
    adults: state.adults,
    childrenNumber: state.children,
    listOrigin: state.listOrigin,
    listDestination: state.listDestination,
    addReturn: state.addReturn,
    journeyPlan: state.journeyPlan,
    loadingTrains: state.loadingTrains,
    error: state.error,
    outwardReturn: state.outwardReturn,
    openMoreTicketsOutwardId: state.openMoreTicketsOutwardId,
    openMoreTicketsOutward: state.openMoreTicketsOutward,
    openMoreTicketsReturnId: state.openMoreTicketsReturnId,
    openMoreTicketsReturn: state.openMoreTicketsReturn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    post: (url, body) => {
      console.log(body)
      fetch(url, body)
        .then((response) => {
          return response
        })
        .then((response) => response.json())
        .then((data) => dispatch(postSuccess(data)))
        .catch(() => dispatch(error(true)))
    },
    isLoadingTrains: (bool) => {
      dispatch(isLoadingTrains(bool))
    },
    setOutwardReturn: (value) => {
      dispatch(setOutwardReturn(value))
    },
    setOpenMoreTicketsOutwardId: (id) => {
      dispatch(setOpenMoreTicketsOutwardId(id))
    },
    setOpenMoreTicketsOutward: (bool) => {
      dispatch(setOpenMoreTicketsOutward(bool))
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
    }
  }
}

const SelectTicketTrainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTicketTrain)

export default SelectTicketTrainContainer
