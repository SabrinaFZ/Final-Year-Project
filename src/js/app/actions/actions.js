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

export const setOutwardReturn = (value) => {
  return {
    type: 'SET_OUTWARD_RETURN',
    value
  }
}

export const setOpenMoreTicketsOutwardId = (id) => {
  return {
    type: 'SET_OPEN_MORE_TICKETS_OUTWARD_ID',
    id
  }
}

export const setOpenMoreTicketsOutward = (bool) => {
  return {
    type: 'SET_OPEN_MORE_TICKETS_OUTWARD',
    bool
  }
}

export const setOpenMoreTicketsReturnId = (id) => {
  return {
    type: 'SET_OPEN_MORE_TICKETS_RETURN_ID',
    id
  }
}

export const setOpenMoreTicketsReturn = (bool) => {
  return {
    type: 'SET_OPEN_MORE_TICKETS_RETURN',
    bool
  }
}

export const selectedOutward = (value) => {
  return {
    type: 'SELECT_OUTWARD',
    value
  }
}

export const selectedReturn = (value) => {
  return {
    type: 'SELECT_RETURN',
    value
  }
}

export const addShoppingCart = (value) => {
  return {
    type: 'ADD_SHOPPING_CART',
    value
  }
}

export const addedCart = (bool) => {
  return {
    type: 'ADD_CART',
    bool
  }
}

export const resetAll = () => {
  return {
    type: 'RESET_ALL',
  }
}

export const update = (value) => {
  return {
    type: 'UPDATE',
    value
  }
}

export const setLatitudeOrigin = (value) => {
  return {
    type: 'SET_LATITUDE_ORIGIN',
    value
  }
}

export const setLongitudeOrigin = (value) => {
  return {
    type: 'SET_LONGITUDE_ORIGIN',
    value
  }
}

export const setLatitudeDestination = (value) => {
  return {
    type: 'SET_LATITUDE_DESTINATION',
    value
  }
}

export const setLongitudeDestination = (value) => {
  return {
    type: 'SET_LONGITUDE_DESTINATION',
    value
  }
}

export const openModalMap = (bool) => {
  return {
    type: 'OPEN_MODAL_MAP',
    bool
  }
}

export const selectedMap = (value) => {
  return {
    type: 'SELECTED_MAP',
    value
  }
}

export const openModalInfoOutward = (bool) => {
  return {
    type: 'OPEN_MODAL_INFO_OUTWARD',
    bool
  }
}

export const setOpenModalInfoOutwardId = (value) => {
  return {
    type: 'OPEN_MODAL_INFO_OUTWARD_ID',
    value
  }
}

export const openModalInfoReturn = (bool) => {
  return {
    type: 'OPEN_MODAL_INFO_RETURN',
    bool
  }
}

export const setOpenModalInfoReturnId = (value) => {
  return {
    type: 'OPEN_MODAL_INFO_RETURN_ID',
    value
  }
}

export const setOpenModalPayment = (bool) => {
  return {
    type: 'OPEN_MODAL_PAYMENT',
    bool
  }
}

export const setSelectedPayment = (value) => {
  return {
    type: 'SET_SELECTED_PAYMENT',
    value
  }
}

export const setChangeCardHolderName = (value) => {
  return {
    type: 'CHANGE_NAME_HOLDER',
    value
  }
}

export const setChangeNumber = (value) => {
  return {
    type: 'CHANGE_NUMBER',
    value
  }
}

export const setChangeCVV = (value) => {
  return {
    type: 'CHANGE_CVV',
    value
  }
}

export const setChangeAddressLine1 = (value) => {
  return {
    type: 'CHANGE_ADDRESS_LINE_1',
    value
  }
}

export const setChangeAddressLine2 = (value) => {
  return {
    type: 'CHANGE_ADDRESS_LINE_2',
    value
  }
}

export const setChangeAddressLine3 = (value) => {
  return {
    type: 'CHANGE_ADDRESS_LINE_3',
    value
  }
}

export const setChangeCity = (value) => {
  return {
    type: 'CHANGE_CITY',
    value
  }
}

export const setChangeCountry = (value) => {
  return {
    type: 'CHANGE_COUNTRY',
    value
  }
}

export const setChangePostcode = (value) => {
  return {
    type: 'CHANGE_POSTCODE',
    value
  }
}

export const setChangeExpiredMonth = (value) => {
  return {
    type: 'CHANGE_EXPIRED_MONTH',
    value
  }
}

export const setChangeExpiredYear = (value) => {
  return {
    type: 'CHANGE_EXPIRED_YEAR',
    value
  }
}

export const setChangeEmail = (value) => {
  return {
    type: 'CHANGE_EMAIL',
    value
  }
}

export const createTokenSuccess = (value) => {
  return {
    type: 'CREATE_TOKEN_CARD',
    value
  }
}

export const setOrders = (data) => {
  return {
    type: 'SET_ORDER',
    data
  }
}

export const resetOrder = () => {
  return {
    type: 'RESET_ORDER',
  }
}

export const deletedJourney = (bool) => {
  return {
    type: 'DELETED_JOURNEY',
    bool
  }
}

export const deletedJourneyShoppingCart = (bool) => {
  return {
    type: 'DELETED_JOURNEY_SHOPPING_CART',
    bool
  }
}

export const isAnotherTrip = (bool) => {
  return {
    type: 'SET_ANOTHER_TRIP',
    bool
  }
}

export const isDeletedTrip = (bool) => {
  return {
    type: 'IS_DELETED_TRIP',
    bool
  }
}

export const setDateTimePickerVisible = (bool) => {
  return {
    type: 'SET_OPEN_DATETIME',
    bool
  }
}

export const setDateTimePickerVisibleFrom = (bool) => {
  return {
    type: 'SET_OPEN_DATETIME_FROM',
    bool
  }
}

export const setDateTimePickerVisibleTo = (bool) => {
  return {
    type: 'SET_OPEN_DATETIME_TO',
    bool
  }
}

export const isPayment = (bool) => {
  return {
    type: 'IS_PAYMENT',
    bool
  }
}


export const isPaymentSuccess = (bool) => {
  return {
    type: 'IS_PAYMENT_SUCCESS',
    bool
  }
}
