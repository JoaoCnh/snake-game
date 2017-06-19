import { combineReducers } from 'redux';

import arkade from 'app/reducers/arkade';
import about from 'app/reducers/about';

export default combineReducers({
	arkade,
	about,
});
