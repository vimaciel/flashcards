import reducer from '../reducers'
import middlewares from '../middlewares'
import { createStore } from 'redux'

export const store = createStore(reducer, middlewares)
