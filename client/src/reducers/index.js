import { combineReducers } from 'redux';
import { SIGNIN_START, SIGNIN_SUCCESS } from '../actions/auth';

const initialState = {
	user: null,
	fetching: false
};

function fetching(state = false, action) {
	switch (action.type) {
		case SIGNIN_START:
			return true;
		case SIGNIN_SUCCESS:
			return false;
		default:
			return state;
	}
}

function userData(state = null, action) {
	switch (action.type) {
		case SIGNIN_SUCCESS:
			return Object.assign({}, state, {
				userData: action.userData,
				fetching: false
			});
		default:
			return state
	}
}

export default combineReducers({
	userData: userData,
	fetching: fetching
});