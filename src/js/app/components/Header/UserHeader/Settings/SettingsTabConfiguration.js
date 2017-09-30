'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorSettings } from './settingsNavigatorConfiguration'

// Redux
import { connect } from 'react-redux'

// Icon
//import Icon from 'react-native-vector-icons/FontAwesome'


const mapStateToProps = (state) => {
 return {
  navigationState: state.tabSettings
  }
}

class SettingsNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    //tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'cogs' } color={ tintColor }/>
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorSettings
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
export default connect(mapStateToProps)(SettingsNavigation)
