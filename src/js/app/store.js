'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

// Navigation
import { NavigatorWelcome } from './components/Welcome/welcomeNavigatorConfiguration'
import { NavigatorShoppingCart } from './components/App/ShoppingCart/shoppingCartNavigatorConfiguration'
import { Header, headerReducer } from './components/Header/headerConfiguration'

// Middleware
const middleware = () => {
  return applyMiddleware(logger)
}

export default createStore(
  combineReducers({
    tabBar: headerReducer,

    tabOne: (state,action) => NavigatorWelcome.router.getStateForAction(action,state),

    tabTwo: (state,action) => NavigatorShoppingCart.router.getStateForAction(action,state)
  }),
  middleware(),
)
