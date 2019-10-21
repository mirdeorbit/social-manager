import _ from 'underscore';
import {
	SCHEDULES_FETCH_SUCCESS,
	SCHEDULE_GET_SUCCESS,
	SCHEDULE_RESET
} from '../data/actionCreators/schedules';

const schedules = (state = null, action) => {
	switch (action.type) {
		case SCHEDULES_FETCH_SUCCESS:
			return action.payload;
		default:
			return state
	}
};

const schedule = (state = null, action) => {
	switch (action.type) {
		case SCHEDULE_GET_SUCCESS:
			return _(action.payload).omit('createDate', 'updateDate');
		case SCHEDULE_RESET:
			return null;
		default:
			return state
	}
};

export default {
	schedules: schedules,
	schedule: schedule
};