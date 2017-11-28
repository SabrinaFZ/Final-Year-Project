import { connect } from 'react-redux'

import PayButton from './../../components/Header/Items/App/PayButton'

import { setOpenModalPayment, error, createTokenSuccess, update, resetOrder, isPayment } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    card: state.card,
    orders: state.orders,
    isPayment: state.isPayment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (url, body) => {
      fetch(url, body)
        .then((response) => {
          return response
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == 'success'){
            let shoppingCart = []
            dispatch(isPayment(true))
            dispatch(setOpenModalPayment(false))
            dispatch(update(shoppingCart))
            dispatch(resetOrder())
            dispatch(isPayment(false))
          } else {
            dispatch(error(true))
            dispatch(isPayment(false))
          }
        })
        .catch(() => {
          dispatch(error(true))
          dispatch(isPayment(false))
        })
    }
  }
}

const PayButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PayButton)

export default PayButtonContainer
