import { connect } from 'react-redux'

import SelectPaymentMethod from './../../components/Header/Items/App/SelectPaymentMethod'

import { setOpenModalPayment } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    openModalPayment: state.openModalPayment,
    isPayment: state.isPayment,
    total: ownProps.total
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOpenModalPayment: (bool) => {
      dispatch(setOpenModalPayment(bool))
    }
  }
}

const SelectPaymentMethodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPaymentMethod)

export default SelectPaymentMethodContainer
