import { createStore } from 'redux'
import { rootReducer, defaultState } from './reducer'

// let store = createStore(rootReducer, defaultState)

export default createStore(rootReducer, defaultState)