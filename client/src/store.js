import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension' 
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

const middleware =[thunk]

let store

if (process.env.NODE_ENV === 'production') {
    store = createStore(
        rootReducer, 
        initialState, 
        compose(applyMiddleware(...middleware))
    )
} else {
    store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    )
}

export default store