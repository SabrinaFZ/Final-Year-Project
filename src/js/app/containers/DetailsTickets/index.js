import { connect } from 'react-redux'

import DetailsTickets from './../../components/Header/Items/App/DetailsTickets'

import { addShoppingCart, addedCart } from './../../actions/actions'

const mapStateToProps = (state) => {
  return {
    selectedOutward: state.selectedOutward,
    selectedReturn: state.selectedReturn,
    addReturn: state.addReturn,
    journeyPlan: state.journeyPlan,
    addCart: state.addCart,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addShoppingCart: (item) => {
      dispatch(addShoppingCart(item))
    },
    addedCart: (bool) => {
      dispatch(addedCart(bool))
    }
  }
}

const DetailsTicketsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsTickets)

export default DetailsTicketsContainer
