import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import reducer from './reducer'
import thunk from 'redux-thunk'

const logger = createLogger({})
const USE_LOGGER = false
const middlewares = [ thunk ]

if (USE_LOGGER) {
  middlewares.append(logger)
}
const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
