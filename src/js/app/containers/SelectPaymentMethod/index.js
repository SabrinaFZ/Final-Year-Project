import { connect } from 'react-redux'

import SelectPaymentMethod from './../../components/Header/Items/App/SelectPaymentMethod'

import { setOpenModalPayment, setSelectedPayment, setChangeCVV, setChangeCity, setChangeEmail, setChangeNumber, setChangeCountry, setChangePostcode, setChangeExpiredYear, setChangeAddressLine1, setChangeAddressLine2, setChangeAddressLine3, setChangeExpiredMonth, setChangeCardHolderName, error, createTokenSuccess, update, resetOrder } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    openModalPayment: state.openModalPayment,
    selectedPayment: state.selectedPayment,
    card: state.card,
    orders: state.orders,
    total: ownProps.total
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOpenModalPayment: (bool) => {
      dispatch(setOpenModalPayment(bool))
    },
    setSelectedPayment: (value) => {
      dispatch(setSelectedPayment(value))
    },
    setChangeCVV: (value) => {
      dispatch(setChangeCVV(value))
    },
    setChangeCity: (value) => {
      dispatch(setChangeCity(value))
    },
    setChangeEmail: (value) => {
      dispatch(setChangeEmail(value))
    },
    setChangeNumber: (value) => {
      dispatch(setChangeNumber(value))
    },
    setChangeCountry: (value) => {
      dispatch(setChangeCountry(value))
    },
    setChangePostcode: (value) => {
      dispatch(setChangePostcode(value))
    },
    setChangeExpiredYear: (value) => {
      dispatch(setChangeExpiredYear(value))
    },
    setChangeAddressLine3: (value) => {
      dispatch(setChangeAddressLine3(value))
    },
    setChangeAddressLine2: (value) => {
      dispatch(setChangeAddressLine2(value))
    },
    setChangeAddressLine1: (value) => {
      dispatch(setChangeAddressLine1(value))
    },
    setChangeExpiredMonth: (value) => {
      dispatch(setChangeExpiredMonth(value))
    },
    setChangeCardHolderName: (value) => {
      dispatch(setChangeCardHolderName(value))
    },
    createToken: (url, body) => {
      fetch(url, body)
        .then((response) => {
          return response
        })
        .then((response) => response.json())
        .then((data) => dispatch(createTokenSuccess(data.token)))
        .catch(() => dispatch(error(true)))
    },
    auth: (url, body) => {
      fetch(url, body)
        .then((response) => {
          return response
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == 'success'){
            let shoppingCart = []
            dispatch(setOpenModalPayment(false))
            dispatch(update(shoppingCart))
            dispatch(resetOrder())
          }
        })
        .catch(() => dispatch(error(true)))
    },
    setDelivery: (url, body) => {
      fetch(url, body)
        .then((response) => {
          return response
        })
        .catch(() => dispatch(error(true)))
    }
  }
}

const SelectPaymentMethodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPaymentMethod)

export default SelectPaymentMethodContainer
