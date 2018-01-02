import { connect } from 'react-redux'

import SelectPaymentMethod from './../../components/App/SelectPaymentMethod'

import { setOpenModalPayment, isPayment, isEmailSent, isPaymentSuccess } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    openModalPayment: state.openModalPayment,
    isPayment: state.isPayment,
    total: ownProps.total,
    shoppingCart: state.shoppingCart,
    emailSent: state.emailSent,
    isPaymentSuccess: state.isPaymentSuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOpenModalPayment: (bool) => {
      dispatch(setOpenModalPayment(bool))
    },
    setPayment: (bool) => {
      dispatch(isPayment(bool))
    },
    isEmailSent: (bool) => {
      dispatch(isEmailSent(bool))
    },
    setPaymentSuccess: (bool) => {
      dispatch(isPaymentSuccess(bool))
    }
  }
}

const SelectPaymentMethodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPaymentMethod)

export default SelectPaymentMethodContainer
