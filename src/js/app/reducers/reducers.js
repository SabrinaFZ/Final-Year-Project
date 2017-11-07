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
  arrivingLeaving: 'Leaving',
  outwardReturn: 'Outward',
  openMoreTicketsOutwardId: 0,
  openMoreTicketsOutward: false,
  openMoreTicketsReturnId: 0,
  openMoreTicketsReturn: false,
  selectedOutward: {},
  selectedReturn: {},
  shoppingCart: [],
  addCart: false,
  latitude: 0,
  longitude: 0,
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'SHOW_HIDE_WELCOME': {
      return Object.assign({}, state, {isVisible: action.bool})
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
      return Object.assign({}, state, { outward: {rangeStart: action.date.dateStart, rangeEnd: action.date.dateEnd, arriveDepart: 'Depart'}, returnBack: {rangeStart: action.date.dateStart, rangeEnd: action.date.dateEnd, arriveDepart: '' }})
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
    case 'SET_OUTWARD_RETURN' : {
      return Object.assign({}, state, { outwardReturn: action.value })
    }
    case 'SET_OPEN_MORE_TICKETS_OUTWARD_ID' : {
      return Object.assign({}, state, { openMoreTicketsOutwardId: action.id })
    }
    case 'SET_OPEN_MORE_TICKETS_OUTWARD' : {
      return Object.assign({}, state, { openMoreTicketsOutward: action.bool })
    }
    case 'SET_OPEN_MORE_TICKETS_RETURN_ID' : {
      return Object.assign({}, state, { openMoreTicketsReturnId: action.id })
    }
    case 'SET_OPEN_MORE_TICKETS_RETURN' : {
      return Object.assign({}, state, { openMoreTicketsReturn: action.bool })
    }
    case 'SET_OPEN_MORE_TICKETS_RETURN' : {
      return Object.assign({}, state, { openMoreTicketsReturn: action.bool })
    }
    case 'SELECT_OUTWARD': {
      return Object.assign({}, state, { selectedOutward: action.value })
    }
    case 'SELECT_RETURN': {
      return Object.assign({}, state, { selectedReturn: action.value })
    }
    case 'ADD_SHOPPING_CART': {
      return Object.assign({}, state, { shoppingCart: state.shoppingCart.concat(action.value) })
    }
    case 'ADD_CART': {
      return Object.assign({}, state, { addCart: action.bool })
    }
    case 'UPDATE': {
      return Object.assign({}, state, { shoppingCart: action.value })
    }
    case 'SET_LATITUDE': {
      return Object.assign({}, state, { latitude: action.value })
    }
    case 'SET_LONGITUDE': {
      return Object.assign({}, state, { longitude: action.value })
    }
    case 'RESET_ALL': {
      return Object.assign({}, state, {
        listOrigin: [],
        originSelected: '',
        listDestination: [],
        destinationSelected: '',
        resultOrigin: [],
        resultDestination: [],
        addReturn: false,
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
        adults: 1,
        children: 0,
        arrivingLeaving: 'Leaving',
        outwardReturn: 'Outward',
        addCart: false,
      })
    }
    default: {
      return state
    }
  }
}

export default reducer
