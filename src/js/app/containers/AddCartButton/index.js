import { connect } from 'react-redux'

import AddCartButton from './../../components/Header/Items/App/AddCartButton'

import { addShoppingCart, addedCart, update, setOrders, error, deletedJourney, isAnotherTrip, isDeletedTrip } from './../../actions/actions'

const mapStateToProps = (state) => {
  return {
    selectedOutward: state.selectedOutward,
    selectedReturn: state.selectedReturn,
    addCart: state.addCart,
    addReturn: state.addReturn,
    shoppingCart: state.shoppingCart,
    orders: state.orders,
    deletedJourney: state.deletedJourney,
    isAnotherTrip: state.isAnotherTrip,
    isDeletedTrip: state.isDeletedTrip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAddedCart: (bool) => {
      dispatch(addedCart(bool))
    },
    addShoppingCart: (item) => {
      dispatch(addShoppingCart(item))
    },
    update: (value) => {
      dispatch(update(value))
    },
    setOrder: (url, body) => {
      fetch(url, body)
      .then((response) => {
        return response
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch(isAnotherTrip(true))
        dispatch(setOrders(data.result))
        dispatch(isAnotherTrip(false))
      })
      .catch(() => dispatch(error(true)))
    },
    setTrip: (url, body) => {
      fetch(url, body)
      .then((response) => {
        return response
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch(deletedJourney(false))
        dispatch(isAnotherTrip(false))
        dispatch(setOrders(data.result))
      })
      .catch(() => dispatch(error(true)))
    },
    delete: (url, body) => {
      fetch(url, body)
      .then((response) => {
        dispatch(deletedJourney(true))
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
        dispatch(isAnotherTrip(true))
        dispatch(setOrders(data.result))
      })
      .catch(() => dispatch(error(true)))
    },
    setDeletedTrip: (bool) => {
      dispatch(isDeletedTrip(bool))
    }
  }
}

const AddCartButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCartButton)

export default AddCartButtonContainer
