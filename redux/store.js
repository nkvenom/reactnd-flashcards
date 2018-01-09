import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import reducer from './reducer'
import thunk from 'redux-thunk'

const logger = createLogger({})
const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store
