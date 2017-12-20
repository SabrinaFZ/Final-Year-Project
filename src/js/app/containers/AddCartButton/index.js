import { connect } from 'react-redux'

import AddCartButton from './../../components/App/AddCartButton'

import { addShoppingCart, addedCart, update, setOrders, error, deletedJourney, isAnotherTrip, isDeletedTrip } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    total: ownProps.total,
    selectedOutward: state.selectedOutward,
    selectedReturn: state.selectedReturn,
    addCart: state.addCart,
    addReturn: state.addReturn,
    shoppingCart: state.shoppingCart,
    orders: state.orders,
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
    setOrder: (data) => {
      dispatch(setOrders(data))
    },
    setTrip: (data) => {
      dispatch(setOrders(data.result))
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
