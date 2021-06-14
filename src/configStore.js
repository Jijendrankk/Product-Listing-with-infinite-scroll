import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducers';
import ReduxPromise from 'redux-promise';

export default function configureStore(initialState = {}) {
	const store = createStore(
		reducer,
		initialState,
		compose(
			applyMiddleware(thunk, ReduxPromise),
			window.__REDUX_DEVTOOLS_EXTENSION__
				? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
				: (f) => f
		)
	);
	return store;
}
