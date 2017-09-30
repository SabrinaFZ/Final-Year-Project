'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { UserHeader } from './userHeaderConfiguration'

//Redux
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabUserBar,
  }
}

class UserHeaderNavigation extends React.Component {

  render(){
    const { dispatch, navigationState } = this.props
    return (
      <UserHeader
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

export default connect(mapStateToProps)(UserHeaderNavigation)
