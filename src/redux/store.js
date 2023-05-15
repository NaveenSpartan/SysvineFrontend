import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducer/index'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const devTools = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, devTools)

export default store
