import { TabNavigator } from 'react-navigation'
// Tab-Navigators
import WelcomeTabConfiguration from '../Welcome/WelcomeTabConfiguration'
import ShoppingCartTabConfiguration from '../App/ShoppingCart/ShoppingCartTabConfiguration'

const routeConfiguration = {
  TabWelcomeNavigation: { screen: WelcomeTabConfiguration },
  TabShoppingCartNavigation: { screen : ShoppingCartTabConfiguration}
}
const tabBarConfiguration = {
  //...other configs
tabBarOptions:{
    // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
// background color is for the tab component
    activeBackgroundColor: 'blue',
    inactiveBackgroundColor: 'white',
  }
}

export const headerReducer = (state,action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, index:0 }
  } else {
    return Header.router.getStateForAction(action,state)
  }
}

export const Header = TabNavigator(routeConfiguration,tabBarConfiguration)
