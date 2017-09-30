'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorMenu } from './menuNavigatorConfiguration'

// Redux
import { connect } from 'react-redux'

// Icon
//import Icon from 'react-native-vector-icons/FontAwesome'


const mapStateToProps = (state) => {
 return {
  navigationState: state.tabMenu
  }
}

class MenuNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Menu',
    //tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'cogs' } color={ tintColor }/>
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorMenu
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
export default connect(mapStateToProps)(MenuNavigation)
