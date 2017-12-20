import { connect } from 'react-redux'

import SelectChildren from './../../../components/App/SelectPassengers/SelectChildren'

import { changeChildrenNumber } from './../../../actions/actions'

const mapStateToProps = state => {
  return {
    childrenNumber: state.children,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeChildrenNumber: (number) => {
      dispatch(changeChildrenNumber(number))
    },
  }
}

const SelectChildrenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectChildren)

export default SelectChildrenContainer
