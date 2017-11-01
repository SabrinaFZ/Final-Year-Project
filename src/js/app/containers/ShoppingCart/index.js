import { connect } from 'react-redux'

import ShoppingCart from './../../components/Header/Items/ShoppingCart'

import { update } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    shoppingCart: state.shoppingCart,
    journeyPlan: state.journeyPlan,
    addCart: state.addCart,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (value) =>{
      dispatch(update(value))
    }
  }
}

const ShoppingCartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)

export default ShoppingCartContainer
