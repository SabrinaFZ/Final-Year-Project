'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

// Navigation
import { NavigatorWelcome } from './components/Welcome/welcomeNavigatorConfiguration'
import { NavigatorShoppingCart } from './components/App/ShoppingCart/shoppingCartNavigatorConfiguration'
import { Header, headerReducer } from './components/Header/Header/headerConfiguration'
import { UserHeader, userHeaderReducer } from './components/Header/UserHeader/userHeaderConfiguration'
import { NavigatorSettings } from './components/Header/UserHeader/Settings/settingsNavigatorConfiguration'
import { NavigatorRouter } from './components/Header/navigationConfiguration'
import { NavigatorStackHeader } from './components/Header/StackNavigationHeader/stackNavigationConfiguration'
import { NavigatorStackUserHeader } from './components/Header/StackNavigationUserHeader/stackNavigationConfiguration'
import { NavigatorMenu } from './components/Menu/menuNavigatorConfiguration'

// Middleware
const middleware = () => {
  return applyMiddleware(logger)
}

export default createStore(
  combineReducers({
    tabBar: headerReducer,

    tabOne: (state,action) => NavigatorWelcome.router.getStateForAction(action,state),

    tabTwo: (state,action) => NavigatorShoppingCart.router.getStateForAction(action,state),

    tabUserBar: userHeaderReducer,

    tabSettings: (state,action) => NavigatorSettings.router.getStateForAction(action,state),

    tabMain: (state,action) => NavigatorRouter.router.getStateForAction(action,state),

    tabStackHeader: (state,action) => NavigatorStackHeader.router.getStateForAction(action,state),

    tabStackUserHeader: (state,action) => NavigatorStackUserHeader.router.getStateForAction(action,state),

    tabMenu: (state,action) => NavigatorMenu.router.getStateForAction(action,state),
  }),
  middleware(),
)
