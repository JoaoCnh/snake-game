import { Map } from 'immutable';

import {
	LOAD_README,
	README_LOADED,
	README_ERROR,
} from 'app/actions/about';

const initialState = Map({
	loadingReadme: false,
	readme: "",
	readmeError: false,
});

const actionsMap = {
	[LOAD_README]: (state) => {
		return state.merge({
			loadingReadme: true,
		});
	},
	[README_LOADED]: (state, action) => {
		return state.merge({
			loadingReadme: false,
			readme: action.payload,
		});
	},
	[README_ERROR]: (state, action) => {
		return state.merge({
			loadingReadme: false,
			readme: null,
			readmeError: action.payload,
		});
	},
};

export default function reducer(state = initialState, action = {}) {
	const fn = actionsMap[action.type];
	return fn ? fn(state, action) : state;
}
