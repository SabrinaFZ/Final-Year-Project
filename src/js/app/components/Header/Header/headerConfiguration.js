import { TabNavigator } from 'react-navigation'
// Tab-Navigators
import WelcomeNavigation from '../../Welcome/WelcomeTabConfiguration'
import ShoppingCartNavigation from '../../App/ShoppingCart/ShoppingCartTabConfiguration'

const routeConfiguration = {
  TabWelcomeNavigation: { screen: WelcomeNavigation },
  TabShoppingCartNavigation: { screen : ShoppingCartNavigation},
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
    indicatorStyle: {
      backgroundColor: 'white',
    },
    swipeEnabled: false,
    animationEnabled: false,
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
