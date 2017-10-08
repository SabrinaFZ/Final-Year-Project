'use strict'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

const middleware = () => {
  return applyMiddleware(logger)
}

export default createStore(
  middleware(),
)
