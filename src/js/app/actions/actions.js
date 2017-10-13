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

export const post = (url, body) => {
  return (dispatch) => {
    fetch(url, body)
      .then((response) => {
        return response
      })
      .then((response) => response.json())
      .then((data) => dispatch(postSuccess(data)))
      .catch(() => dispatch(error(true)))
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

export const onChangeDepartureDateTime = (date, type) => {
  if(type == 'OUTWARD'){
    return {
      type: 'CHANGE_DATE_DEPARTURE_OUTWARD',
      date
    }
  }
  return {
    type: 'CHANGE_DATE_DEPARTURE_RETURN',
    date
  }
}

export const onChangeArrivalDateTime = (date, type) => {
  if(type == 'OUTWARD'){
    return {
      type: 'CHANGE_DATE_ARRIVAL_OUTWARD',
      date
    }
  }
  return {
    type: 'CHANGE_DATE_ARRIVAL_RETURN',
    date
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
