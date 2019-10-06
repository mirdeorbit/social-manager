import { CURRENT_USER_GET_SUCCESS } from '../data/actionCreators/auth';

function currentUser(state = null, action) {
	switch (action.type) {
		case CURRENT_USER_GET_SUCCESS:
			return action.currentUser;
		default:
			return state
	}
};

export default {
	currentUser: currentUser
};