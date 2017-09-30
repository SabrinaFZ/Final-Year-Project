'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorStackHeader } from './stackNavigationConfiguration'

//Redux
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabStackHeader,
  }
}

class StackHeaderNavigation extends React.Component {

  render(){
    const { dispatch, navigationState } = this.props
    return (
      <NavigatorStackHeader
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

export default connect(mapStateToProps)(StackHeaderNavigation)
