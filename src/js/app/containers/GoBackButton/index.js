import { connect } from 'react-redux'

import GoBackButton from './../../components/Header/Buttons/GoBackButton'

import { resetAll} from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    addCart: state.addCart,
  }
}

const GoBackButtonContainer = connect(
  mapStateToProps
)(GoBackButton)

export default GoBackButtonContainer
