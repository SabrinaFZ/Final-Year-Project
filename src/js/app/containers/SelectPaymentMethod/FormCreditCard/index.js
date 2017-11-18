import { connect } from 'react-redux'

import FormCreditCard from './../../../components/Header/Items/App/SelectPaymentMethod/FormCreditCard'

import { setChangeCVV, setChangeCity, setChangeEmail, setChangeNumber, setChangeCountry, setChangePostcode, setChangeExpiredYear, setChangeAddressLine1, setChangeAddressLine2, setChangeAddressLine3, setChangeExpiredMonth, setChangeCardHolderName } from './../../../actions/actions'

const mapStateToProps = state => {
  return {
    card: state.card
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
    }
  }
}

const FormCreditCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCreditCard)

export default FormCreditCardContainer
