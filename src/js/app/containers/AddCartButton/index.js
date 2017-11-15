import { connect } from 'react-redux'

import AddCartButton from './../../components/Header/Items/App/AddCartButton'

import { addShoppingCart, addedCart, update, setOrders, error } from './../../actions/actions'

const mapStateToProps = (state) => {
  return {
    selectedOutward: state.selectedOutward,
    selectedReturn: state.selectedReturn,
    addCart: state.addCart,
    addReturn: state.addReturn,
    shoppingCart: state.shoppingCart,
    orders: state.orders
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
      .then((data) => dispatch(setOrders(data.result)))
      .catch(() => dispatch(error(true)))
    },
    setTrip: (url, body) => {
      fetch(url, body)
      .then((response) => {
        return response
      })
      .then((response) => response.json())
      .then((data) => dispatch(setOrders(data.result)))
      .catch(() => dispatch(error(true)))
    }
  }
}

const AddCartButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCartButton)

export default AddCartButtonContainer
