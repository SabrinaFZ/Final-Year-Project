import { connect } from 'react-redux'

import AddCartButton from './../../components/Header/Items/App/AddCartButton'

import { addShoppingCart, addedCart, update } from './../../actions/actions'

const mapStateToProps = (state) => {
  return {
    selectedOutward: state.selectedOutward,
    selectedReturn: state.selectedReturn,
    addCart: state.addCart,
    addReturn: state.addReturn,
    shoppingCart: state.shoppingCart,
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
    update: (value) =>{
      dispatch(update(value))
    },
  }
}

const AddCartButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCartButton)

export default AddCartButtonContainer
