'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorWelcome } from './welcomeNavigatorConfiguration'

// Redux
import { connect } from 'react-redux'

// Icon
//import Icon from 'react-native-vector-icons/FontAwesome'


const mapStateToProps = (state) => {
 return {
  navigationState: state.tabOne
  }
}

class WelcomeNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Tab One',
    //tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'cogs' } color={ tintColor }/>
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorWelcome
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(WelcomeNavigation)
