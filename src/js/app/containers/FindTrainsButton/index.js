import { connect } from 'react-redux'

import FindTrainsButton from './../../components/Header/Items/App/FindTrainsButton'

import { isLoadingTrains } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    navigation: ownProps.navigation,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isLoadingTrains: (bool) => {
      dispatch(isLoadingTrains(bool))
    },
  }
}

const FindTrainsButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FindTrainsButton)

export default FindTrainsButtonContainer
