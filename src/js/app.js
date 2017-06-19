import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import 'babel-polyfill';
import logger from 'app/dev/logger';

import rootReducer from 'app/reducers';

import Arkade from 'app/views/Arkade';

import '../scss/arkade.scss';

const isProduction = process.env.NODE_ENV === 'production';

let store = null;

if (isProduction) {
	const middleware = applyMiddleware(thunk);

	store = createStore(
		rootReducer,
		middleware
	);
} else {
	const middleware = applyMiddleware(thunk, logger);
	let enhancer;

	if (window.__REDUX_DEVTOOLS_EXTENSION__) {
		enhancer = compose(
			middleware,
			window.__REDUX_DEVTOOLS_EXTENSION__()
		);
	} else {
		enhancer = compose(middleware);
	}

	store = createStore(
		rootReducer,
		enhancer
	);
}

ReactDOM.render(
	<Provider store={store}>
		<Arkade />
	</Provider>,
	document.getElementById('arkade')
);