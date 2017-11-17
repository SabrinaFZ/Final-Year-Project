import { connect } from 'react-redux'

import ShoppingCart from './../../components/Header/Items/ShoppingCart'

import { update, openModalInfoOutward, openModalInfoReturn, setOpenModalInfoOutwardId, setOpenModalInfoReturnId, setOpenModalPayment, setOrders, error, deletedJourneyShoppingCart, isDeletedTrip } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    shoppingCart: state.shoppingCart,
    journeyPlan: state.journeyPlan,
    addCart: state.addCart,
    openModalInfoOutward: state.openModalInfoOutward,
    openModalInfoReturn: state.openModalInfoReturn,
    openModalInfoOutwardId: state.openModalInfoOutwardId,
    openModalInfoReturnId: state.openModalInfoReturnId,
    openModalPayment: state.openModalPayment,
    orders: state.orders,
    deletedJourneyShoppingCart: state.deletedJourneyShoppingCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (value) =>{
      dispatch(update(value))
    },
    setOpenModalInfoOutward: (bool) => {
      dispatch(openModalInfoOutward(bool))
    },
    setOpenModalInfoReturn: (bool) => {
      dispatch(openModalInfoReturn(bool))
    },
    setOpenModalInfoOutwardId: (value) => {
      dispatch(setOpenModalInfoOutwardId(value))
    },
    setOpenModalInfoReturnId: (value) => {
      dispatch(setOpenModalInfoReturnId(value))
    },
    setOpenModalPayment: (bool) => {
      dispatch(setOpenModalPayment(bool))
    },
    delete: (url, body) => {
      fetch(url, body)
      .then((response) => {
        dispatch(deletedJourneyShoppingCart(true))
        dispatch(isDeletedTrip(true))
        return response
      })
      .catch(() => dispatch(error(true)))
    },
    get: (url, body) => {
      fetch(url, body)
      .then((response) => {
        return response
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setOrders(data.result))
        dispatch(deletedJourneyShoppingCart(false))
      })
      .catch(() => dispatch(error(true)))
    }
  }
}

const ShoppingCartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)

export default ShoppingCartContainer
