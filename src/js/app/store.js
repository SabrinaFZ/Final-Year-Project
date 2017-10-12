'use strict'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

import reducer from './reducers/reducers'

const middleware = () => {
  return applyMiddleware(logger)
}

export default createStore(
  reducer,
  middleware(),
)
