const initialState = {
  isVisible: false,
  listOrigin: [],
  originSelected: '',
  listDestination: [],
  destinationSelected: '',
  resultOrigin: [],
  resultDestination: [],
  error: 'false',
  journeyPlan: [],
  openOutward: false,
  openReturn:false,
  addReturn: false,
  showModal: false,
  outward: {
    rangeStart: new Date(),
    rangeEnd: new Date(),
    arriveDepart: '',
  },
  returnBack: {
    rangeStart: new Date(),
    rangeEnd: new Date(),
    arriveDepart: '',
  },
  openPassengersModal: false,
  adults: 1,
  children: 0,
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'SHOW_HIDE_WELCOME': {
      return Object.assign({}, state, {isVisible: !action.bool})
    }
    case 'POST_SUCCESS': {
      return Object.assign({}, state, { journeyPlan: state.journeyPlan.concat(action.data) })
    }
    case 'SET_ORIGIN': {
      return Object.assign({}, state, { originSelected: action.itemValue })
    }
    case 'SET_DEST': {
      return Object.assign({}, state, { destinationSelected: action.itemValue })
    }
    case 'OPEN_OUTWARD_MODAL': {
      return Object.assign({}, state, { openOutward: !action.bool, openReturn: false, showModal: true })
    }
    case 'OPEN_RETURN_MODAL': {
      return Object.assign({}, state, { openReturn: !action.bool, openOutward: false, addReturn: true, showModal: true })
    }
    case 'CANCEL_RETURN': {
      return Object.assign({}, state, { cancelReturn: !action.bool, openReturn: false, addReturn: false })
    }
    case 'SHOW_HIDE_MODAL': {
      return Object.assign({}, state, { showModal: !action.bool })
    }
    case 'CHANGE_DATE_DEPARTURE_OUTWARD': {
      return Object.assign({}, state, { outward: {rangeStart: action.date, rangeEnd: state.outward.rangeEnd, arriveDepart: 'Depart'} })
    }
    case 'CHANGE_DATE_DEPARTURE_RETURN': {
      return Object.assign({}, state, { returnBack: {rangeStart: action.date, rangeEnd: state.returnBack.rangeEnd, arriveDepart: 'Depart'} })
    }
    case 'CHANGE_DATE_ARRIVAL_OUTWARD': {
      return Object.assign({}, state, { outward: {rangeStart: state.outward.rangeStart , rangeEnd: action.date, arriveDepart: 'Arrive'} })
    }
    case 'CHANGE_DATE_ARRIVAL_RETURN': {
      return Object.assign({}, state, { returnBack: {rangeStart: state.returnBack.rangeStart, rangeEnd: action.date, arriveDepart: 'Arrive'} })
    }
    case 'SHOW_HIDE_PASSENGERS': {
      return Object.assign({}, state, { openPassengersModal: action.bool })
    }
    case 'CHANGE_NUMBER_ADULT': {
      return Object.assign({}, state, { adults: action.number })
    }
    case 'CHANGE_NUMBER_CHILDREN': {
      return Object.assign({}, state, { children: action.number })
    }
    case 'GET_ORIGIN_SUCCESS': {
      return Object.assign({}, state, { listOrigin: state.listOrigin.concat(action.data) })
    }
    case 'RESET_LIST_ORIGIN': {
      return Object.assign({}, state, { resultOrigin: [] })
    }
    case 'GET_DESTINATION_SUCCESS': {
      return Object.assign({}, state, { listDestination: state.listDestination.concat(action.data) })
    }
    case 'RESET_LIST_DESTINATION': {
      return Object.assign({}, state, { resultDestination: [] })
    }
    case 'SET_RESULT_ORIGIN': {
      return Object.assign({}, state, { resultOrigin: action.data })
    }
    case 'SET_RESULT_DESTINATION': {
      return Object.assign({}, state, { resultDestination: action.data })
    }
    default: {
      return state
    }
  }
}

export default reducer
