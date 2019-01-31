import { createStore, compose, applyMiddleware } from 'redux';
import combineReducers from './reducers';
import { searchMiddleware } from './middlewares/searchMiddleware';
import { showMiddleware } from './middlewares/showMiddleware';

export default function getStore() {
	return createStore(
		combineReducers,
		compose(
			applyMiddleware(searchMiddleware, showMiddleware),

				window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() :
				(noop) => noop
		)
	);
}
