import { connect } from 'react-redux'

import ErrorModal from './../../components/Header/Items/App/ErrorModal'

import { error } from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.error,
    message: ownProps.message
  }
}

const ErrorModalContainer = connect(
  mapStateToProps,
)(ErrorModal)

export default ErrorModalContainer
