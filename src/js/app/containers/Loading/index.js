import { connect } from 'react-redux'

import { showHideWelcome } from './../../actions/actions'
import Loading from '../../components/Loading'


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

const LoadingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading)

export default LoadingContainer
