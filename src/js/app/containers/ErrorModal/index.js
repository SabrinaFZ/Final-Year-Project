import { connect } from 'react-redux'

import ErrorModal from './../../components/App/ErrorModal'

import { error } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.error,
    message: ownProps.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setError: (bool) => {
      dispatch(error(bool))
    }
  }
}

const ErrorModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal)

export default ErrorModalContainer
