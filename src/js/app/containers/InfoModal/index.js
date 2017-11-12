import { connect } from 'react-redux'

import InfoModal from './../../components/Header/Items/App/InfoModal'

import { openModalInfoOutward, openModalInfoReturn } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    openModalInfoOutward: state.openModalInfoOutward,
    openModalInfoReturn: state.openModalInfoReturn,
    routeTrains: ownProps.routeTrains,
    links: ownProps.links
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOpenModalInfoOutward: (bool) => {
      dispatch(openModalInfoOutward(bool))
    },
    setOpenModalInfoReturn: (bool) => {
      dispatch(openModalInfoReturn(bool))
    }
  }
}

const InfoModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoModal)

export default InfoModalContainer
