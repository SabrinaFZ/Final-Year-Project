import { connect } from 'react-redux'

import { showHideWelcome } from './../../actions/actions'
import Welcome from '../../components/Welcome'


const mapStateToProps = state => {
  return { isVisible: state.isVisible }
}

const mapDispatchToProps = dispatch =>{
  return{
    showHideWelcome: (bool) => {
      dispatch(showHideWelcome(bool))
    }
  }
}

const WelcomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome)

export default WelcomeContainer
