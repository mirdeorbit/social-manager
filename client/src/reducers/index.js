import { combineReducers } from 'redux';

import authReducers from './auth';
import schedulesReducers from './schedules';

const fetching = (state = false, action) => {
	return action.type.indexOf('FETCH_START') > 0 || action.type.indexOf('GET_START') > 0
};

export default combineReducers({
	...authReducers,
	...schedulesReducers,
	fetching: fetching
});