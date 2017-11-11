import { connect } from 'react-redux'

import ShoppingCart from './../../components/Header/Items/ShoppingCart'

import { update, openModalInfoOutward, openModalInfoReturn, setOpenModalInfoOutwardId, setOpenModalInfoReturnId } from './../../actions/actions'

const mapStateToProps = state => {
  return {
    shoppingCart: state.shoppingCart,
    journeyPlan: state.journeyPlan,
    addCart: state.addCart,
    openModalInfoOutward: state.openModalInfoOutward,
    openModalInfoReturn: state.openModalInfoReturn,
    openModalInfoOutwardId: state.openModalInfoOutwardId,
    openModalInfoReturnId: state.openModalInfoReturnId
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
    }
  }
}

const ShoppingCartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)

export default ShoppingCartContainer
