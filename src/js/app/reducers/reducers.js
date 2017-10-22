const initialState = {
  isVisible: false,
  listOrigin: [],
  originSelected: '',
  listDestination: [],
  destinationSelected: '',
  resultOrigin: [],
  resultDestination: [],
  error: false,
  loadingOrigin: false,
  loadingDestination: false,
  loadingTrains: false,
  journeyPlan: {},
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
  arrivingLeaving: 'Leaving'
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'SHOW_HIDE_WELCOME': {
      return Object.assign({}, state, {isVisible: !action.bool})
    }
    case 'POST_SUCCESS': {
      return Object.assign({}, state, { error: false, journeyPlan: action.data, loadingTrains:false })
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
      return Object.assign({}, state, { outward: {rangeStart: action.date.dateStart, rangeEnd: action.date.dateEnd, arriveDepart: 'Depart'} })
    }
    case 'CHANGE_DATE_DEPARTURE_RETURN': {
      return Object.assign({}, state, { returnBack: {rangeStart: action.date.dateStart, rangeEnd: action.date.dateEnd, arriveDepart: 'Depart'} })
    }
    case 'CHANGE_DATE_DEPARTURE_TIME_FROM_OUTWARD': {
      return Object.assign({}, state, { outward: {rangeStart: action.date, rangeEnd: state.outward.rangeEnd, arriveDepart: 'Depart'} })
    }
    case 'CHANGE_DATE_DEPARTURE_TIME_TO_OUTWARD': {
      return Object.assign({}, state, { outward: {rangeStart: state.outward.rangeStart, rangeEnd: action.date, arriveDepart: 'Depart'} })
    }
    case 'CHANGE_DATE_DEPARTURE_TIME_FROM_RETURN': {
      return Object.assign({}, state, { returnBack: {rangeStart: action.date, rangeEnd: state.returnBack.rangeEnd, arriveDepart: 'Depart'} })
    }
    case 'CHANGE_DATE_DEPARTURE_TIME_TO_RETURN': {
      return Object.assign({}, state, { returnBack: {rangeStart: state.returnBack.rangeStart, rangeEnd: action.date, arriveDepart: 'Depart'} })
    }

    case 'CHANGE_DATE_ARRIVAL_TIME_FROM_OUTWARD': {
      return Object.assign({}, state, { outward: {rangeStart: action.date, rangeEnd: state.outward.rangeEnd, arriveDepart: 'Arrive'} })
    }
    case 'CHANGE_DATE_ARRIVAL_TIME_TO_OUTWARD': {
      return Object.assign({}, state, { outward: {rangeStart: state.outward.rangeStart, rangeEnd: action.date, arriveDepart: 'Arrive'} })
    }
    case 'CHANGE_DATE_ARRIVAL_TIME_FROM_RETURN': {
      return Object.assign({}, state, { returnBack: {rangeStart: action.date, rangeEnd: state.returnBack.rangeEnd, arriveDepart: 'Arrive'} })
    }
    case 'CHANGE_DATE_ARRIVAL_TIME_TO_RETURN': {
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
      return Object.assign({}, state, { listOrigin: action.data, error: false, loadingOrigin: false })
    }
    case 'GET_ORIGIN_ERROR': {
      return Object.assign({}, state, { listOrigin: [], resultOrigin: [], loadingOrigin: false })
    }
    case 'RESET_LIST_ORIGIN': {
      return Object.assign({}, state, { listOrigin: [], resultOrigin: [] })
    }
    case 'GET_DESTINATION_SUCCESS': {
      return Object.assign({}, state, { listDestination: action.data,  error: false, loadingDestination: false })
    }
    case 'GET_DESTINATION_ERROR': {
      return Object.assign({}, state, { listDestination: [], resultDestination: [], loadingDestination: false })
    }
    case 'RESET_LIST_DESTINATION': {
      return Object.assign({}, state, { listDestination: [], resultDestination: [] })
    }
    case 'SET_RESULT_ORIGIN': {
      return Object.assign({}, state, { resultOrigin: action.data })
    }
    case 'SET_RESULT_DESTINATION': {
      return Object.assign({}, state, { resultDestination: action.data })
    }
    case 'ERROR' : {
      return Object.assign({}, state, { error: true, loadingTrains: false })
    }
    case 'IS_LOADING_ORIGIN' : {
      return Object.assign({}, state, { loadingOrigin: action.bool })
    }
    case 'IS_LOADING_DESTINATION' : {
      return Object.assign({}, state, { loadingDestination: action.bool })
    }
    case 'SET_ARRIVING_LEAVING' : {
      return Object.assign({}, state, { arrivingLeaving: action.value })
    }
    case 'IS_LOADING_TRAINS' : {
      return Object.assign({}, state, { loadingTrains: action.bool })
    }
    default: {
      return state
    }
  }
}

export default reducer
