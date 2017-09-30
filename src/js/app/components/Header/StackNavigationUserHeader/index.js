'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorStackUserHeader } from './stackNavigationConfiguration'

//Redux
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabStackUserHeader,
  }
}

class StackUserHeaderNavigation extends React.Component {

  render(){
    const { dispatch, navigationState } = this.props
    return (
      <NavigatorStackUserHeader
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
      />
    )
  }
}

export default connect(mapStateToProps)(StackUserHeaderNavigation)
