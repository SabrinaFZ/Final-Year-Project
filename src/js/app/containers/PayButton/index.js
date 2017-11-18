import { connect } from 'react-redux'

import PayButton from './../../components/Header/Items/App/PayButton'

import { setOpenModalPayment, error, createTokenSuccess, update, resetOrder } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    card: state.card,
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createToken: (url, body) => {
      fetch(url, body)
        .then((response) => {
          console.log(response)
          return response
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.message == 'OK'){
            dispatch(createTokenSuccess(data.token))
          }
          else {
            dispatch(error(true))
          }
        })
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
          } else {
            dispatch(error(true))
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

const PayButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PayButton)

export default PayButtonContainer
