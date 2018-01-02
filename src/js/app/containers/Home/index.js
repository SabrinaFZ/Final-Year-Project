import { connect } from 'react-redux'

import Home from './../../components/Header/Buttons/Home'

import { resetAll} from './../../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    addCart: state.addCart,
  }
}

const HomeContainer = connect(
  mapStateToProps
)(Home)

export default HomeContainer
