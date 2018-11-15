import { createStore, applyMiddleware, compose } from 'redux'

// middleware
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'
console.log(rootReducer)

const middlewares = [
  thunkMiddleware,
  createLogger()
]

// const finallyCreateStore = compose()

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  return store
}
