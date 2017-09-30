'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorRouter } from './navigationConfiguration'

//Redux
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabMain,
  }
}

class AppNavigation extends React.Component {

  render(){
    const { dispatch, navigationState } = this.props
    return (
      <NavigatorRouter
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

export default connect(mapStateToProps)(AppNavigation)
