import { Map } from 'immutable';

// import {
// 	SET_LOCAL_AUTH,
// } from 'actions/arkade';

const initialState = Map({
	localAuthUser: null,
});

const actionsMap = {
	// [SET_LOCAL_AUTH]: (state, action) => {
	// 	return state.merge({
	// 		localAuthUser: action.payload,
	// 	});
	// },
};

export default function reducer(state = initialState, action = {}) {
	const fn = actionsMap[action.type];
	return fn ? fn(state, action) : state;
}
