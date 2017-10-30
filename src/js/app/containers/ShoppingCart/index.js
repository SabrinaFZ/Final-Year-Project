import { connect } from 'react-redux'

import ShoppingCart from './../../components/Header/Items/ShoppingCart'

import { addShoppingCart } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    shoppingCart: state.shoppingCart,
    journeyPlan: state.journeyPlan,
    addCart: state.addCart
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//
//   }
// }

const ShoppingCartContainer = connect(
  mapStateToProps,
)(ShoppingCart)

export default ShoppingCartContainer
