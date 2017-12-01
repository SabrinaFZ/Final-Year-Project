import { connect } from 'react-redux'

import SelectPaymentMethod from './../../components/Header/Items/App/SelectPaymentMethod'

import { setOpenModalPayment, isPayment, isEmailSent } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    openModalPayment: state.openModalPayment,
    isPayment: state.isPayment,
    total: ownProps.total,
    shoppingCart: state.shoppingCart
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
    }
  }
}

const SelectPaymentMethodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPaymentMethod)

export default SelectPaymentMethodContainer
