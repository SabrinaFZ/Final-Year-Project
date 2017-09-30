import { TabNavigator } from 'react-navigation'
// Tab-Navigators
import SettingsNavigation from './Settings/SettingsTabConfiguration'

const routeConfiguration = {
  TabSettingsNavigation: { screen: SettingsNavigation },
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
    animationEnabled: false
  }
}
//
export const userHeaderReducer = (state,action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, index:0 }
  } else {
    return UserHeader.router.getStateForAction(action,state)
  }
}

export const UserHeader = TabNavigator(routeConfiguration,tabBarConfiguration)
