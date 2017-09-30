'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorShoppingCart } from './shoppingCartNavigatorConfiguration'

// Redux
import { connect } from 'react-redux'

// Icon
//import Icon from 'react-native-vector-icons/FontAwesome'


const mapStateToProps = (state) => {
 return {
  navigationState: state.tabTwo
  }
}

class ShoppingCartNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Shopping Cart',
    //tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'cogs' } color={ tintColor }/>
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorShoppingCart
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
export default connect(mapStateToProps)(ShoppingCartNavigation)
