import { connect } from 'react-redux'

import AddCartButton from './../../components/Header/Items/App/AddCartButton'

import { addShoppingCart, addedCart } from './../../actions/actions'

const mapStateToProps = (state) => {
  return {
    selectedOutward: state.selectedOutward,
    selectedReturn: state.selectedReturn,
    addCart: state.addCart,
    addReturn: state.addReturn,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAddedCart: (bool) => {
      dispatch(addedCart(bool))
    },
    addShoppingCart: (item) => {
      dispatch(addShoppingCart(item))
    }
  }
}

const AddCartButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCartButton)

export default AddCartButtonContainer
