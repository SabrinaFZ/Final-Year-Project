import { connect } from 'react-redux'

import GoHome from './../../components/Header/Buttons/GoHome'

import { resetAll} from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    addCart: state.addCart,
  }
}

const GoHomeContainer = connect(
  mapStateToProps
)(GoHome)

export default GoHomeContainer
