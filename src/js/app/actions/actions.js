export const showHideWelcome = (bool) => {
  return {
    type: 'SHOW_HIDE_WELCOME',
    bool
  }
}

export const postSuccess = (data) => {
  return {
    type: 'POST_SUCCESS',
    data
  }
}

export const error = (bool) => {
  return {
    type: 'ERROR',
    bool
  }
}

export const setOrigin = (itemValue) => {
  return {
    type: 'SET_ORIGIN',
    itemValue
  }
}

export const setDestination = (itemValue) => {
  return {
    type: 'SET_DEST',
    itemValue
  }
}

export const openOutwardModal = (bool) => {
  return {
    type: 'OPEN_OUTWARD_MODAL',
    bool
  }
}

export const openReturnModal = (bool) => {
  return {
    type: 'OPEN_RETURN_MODAL',
    bool
  }
}

export const cancelReturn = (bool) => {
  return {
    type: 'CANCEL_RETURN',
    bool
  }
}

export const showHideModal = (bool) => {
  return {
    type: 'SHOW_HIDE_MODAL',
    bool
  }
}

export const onChangeDepartureDateTime = (dateStart, dateEnd, type) => {
  if(type == 'OUTWARD'){
    return {
      type: 'CHANGE_DATE_DEPARTURE_OUTWARD',
      date: {
        dateStart: dateStart,
        dateEnd: dateEnd,
      }
    }
  }
  return {
    type: 'CHANGE_DATE_DEPARTURE_RETURN',
    date: {
      dateStart: dateStart,
      dateEnd: dateEnd,
    }
  }
}
export const onChangeDepartureTime = (date, type, rangeType) => {
  if(type == 'OUTWARD'){
    if(rangeType == 'from'){
      return {
        type: 'CHANGE_DATE_DEPARTURE_TIME_FROM_OUTWARD',
        date
      }
    }else{
      return {
        type: 'CHANGE_DATE_DEPARTURE_TIME_TO_OUTWARD',
        date
      }
    }
  }
  if(rangeType == 'from'){
    return {
      type: 'CHANGE_DATE_DEPARTURE_TIME_FROM_RETURN',
      date
    }
  }else{
    return {
      type: 'CHANGE_DATE_DEPARTURE_TIME_TO_RETURN',
      date
    }
  }
}
export const onChangeArrivalTime = (date, type, rangeType) => {
  if(type == 'OUTWARD'){
    if(rangeType == 'from'){
      return {
        type: 'CHANGE_DATE_ARRIVAL_TIME_FROM_OUTWARD',
        date
      }
    }else{
      return {
        type: 'CHANGE_DATE_ARRIVAL_TIME_TO_OUTWARD',
        date
      }
    }
  }
  if(rangeType == 'from'){
    return {
      type: 'CHANGE_DATE_ARRIVAL_TIME_FROM_RETURN',
      date
    }
  }else{
    return {
      type: 'CHANGE_DATE_ARRIVAL_TIME_TO_RETURN',
      date
    }
  }
}

export const showHidePassengers = (bool) => {
  return {
    type: 'SHOW_HIDE_PASSENGERS',
    bool
  }
}

export const changeAdultNumber = (number) => {
  return {
    type: 'CHANGE_NUMBER_ADULT',
    number
  }
}

export const changeChildrenNumber = (number) => {
  return {
    type: 'CHANGE_NUMBER_CHILDREN',
    number
  }
}

export const getOriginSuccess = (data) => {
  return {
    type: 'GET_ORIGIN_SUCCESS',
    data
  }
}

export const getOriginError = () => {
  return {
    type: 'GET_ORIGIN_ERROR',
  }
}

export const resetListOrigin = () => {
  return {
    type: 'RESET_LIST_ORIGIN',
  }
}

export const getDestinationSuccess = (data) => {
  return {
    type: 'GET_DESTINATION_SUCCESS',
    data
  }
}

export const getDestinationError = () => {
  return {
    type: 'GET_DESTINATION_ERROR',
  }
}

export const resetListDestination = () => {
  return {
    type: 'RESET_LIST_DESTINATION',
  }
}

export const setResultOrigin = (data) => {
  return {
    type: 'SET_RESULT_ORIGIN',
    data
  }
}

export const setResultDestination = (data) => {
  return {
    type: 'SET_RESULT_DESTINATION',
    data
  }
}

export const isLoadingOrigin = (bool) => {
  return {
    type: 'IS_LOADING_ORIGIN',
    bool
  }
}

export const isLoadingDestination = (bool) => {
  return {
    type: 'IS_LOADING_DESTINATION',
    bool
  }
}

export const setArrivingLeaving = (value) => {
  return {
    type: 'SET_ARRIVING_LEAVING',
    value
  }
}

export const isLoadingTrains = (bool) => {
  return {
    type: 'IS_LOADING_TRAINS',
    bool
  }
}
