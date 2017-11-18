import { connect } from 'react-redux'

import DetailsTickets from './../../components/Header/Items/App/DetailsTickets'

import { addShoppingCart, addedCart, openModalInfoOutward, openModalInfoReturn} from './../../actions/actions'

const mapStateToProps = (state) => {
  return {
    addReturn: state.addReturn,
    selectedOutward: state.selectedOutward,
    selectedReturn: state.selectedReturn
  }
}

const DetailsTicketsContainer = connect(
  mapStateToProps,
)(DetailsTickets)

export default DetailsTicketsContainer
