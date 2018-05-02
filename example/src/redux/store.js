import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

/**
 *  Redux Store configuration
 */

const middlewares = [
    thunk
]

//create store
let store = createStore(reducers, {}, 
	compose(
		applyMiddleware(...middlewares),
		process.env.NODE_ENV === "development" && window.devToolsExtension ? window.devToolsExtension() : f => f
	)
)

export default store;