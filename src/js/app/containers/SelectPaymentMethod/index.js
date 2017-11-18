import { connect } from 'react-redux'

import SelectPaymentMethod from './../../components/Header/Items/App/SelectPaymentMethod'

import { setOpenModalPayment, setSelectedPayment } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    openModalPayment: state.openModalPayment,
    selectedPayment: state.selectedPayment,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOpenModalPayment: (bool) => {
      dispatch(setOpenModalPayment(bool))
    },
    setSelectedPayment: (value) => {
      dispatch(setSelectedPayment(value))
    }
  }
}

const SelectPaymentMethodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPaymentMethod)

export default SelectPaymentMethodContainer
