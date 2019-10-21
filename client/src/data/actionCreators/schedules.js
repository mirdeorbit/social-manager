import _ from 'underscore';
import { get, post, patch } from 'axios';
import config from '../../config';

export const SCHEDULES_FETCH_START = 'SCHEDULES_FETCH_START';
export const SCHEDULES_FETCH_SUCCESS = 'SCHEDULES_FETCH_SUCCESS';
export const SCHEDULE_GET_START = 'SCHEDULE_GET_START';
export const SCHEDULE_GET_SUCCESS = 'SCHEDULE_GET_SUCCESS';
export const SCHEDULE_SAVE_START = 'SCHEDULE_SAVE_START';
export const SCHEDULE_SAVE_SUCCESS = 'SCHEDULE_SAVE_SUCCESS';
export const SCHEDULE_RESET = 'SCHEDULE_RESET';

export const schedulesFetchStart = (token) => {
	return { type: SCHEDULES_FETCH_START, token };
};

export const schedulesFetchSuccess = (schedules) => {
	return { type: SCHEDULES_FETCH_SUCCESS, payload: schedules };
};

export const scheduleGetStart = (id) => {
	return { type: SCHEDULE_GET_START, payload: id };
};

export const scheduleGetSuccess = (schedule) => {
	return { type: SCHEDULE_GET_SUCCESS, payload: schedule };
};

export const scheduleSaveStart = (schedule) => {
	return { type: SCHEDULE_SAVE_START, payload: schedule };
};

export const scheduleSaveSuccess = (schedule) => {
	return	{ type: SCHEDULE_SAVE_SUCCESS, payload: schedule };
};

export const _scheduleReset = () => {
	return { type: SCHEDULE_RESET };
};

export const schedulesFetch = () => {
	return (dispatch) => {
		dispatch(schedulesFetchStart());
		get(`${config.api.baseUrl}/schedules`).then((res) => {
			dispatch(schedulesFetchSuccess(res.data));
		});
	}
};

export const scheduleGet = (id) => {
	return (dispatch) => {
		dispatch(scheduleGetStart());
		get(`${config.api.baseUrl}/schedules/${id}`).then((res) => {
			dispatch(scheduleGetSuccess(res.data));
		});
	}
};

export const scheduleCreate = (data) => {
	return (dispatch) => {
		dispatch(scheduleSaveStart());
		const token = localStorage.getItem('currentUserToken');
		data = _({token: token}).defaults(data);
		post(`${config.api.baseUrl}/schedules`, data).then((res) => {
			dispatch(scheduleSaveSuccess(res.data));
		});
	}
};

export const schedulePatch = (id, data) => {
	return (dispatch) => {
		dispatch(scheduleSaveStart());
		const token = localStorage.getItem('currentUserToken');
		data = _({token: token}).defaults(data);
		patch(`${config.api.baseUrl}/schedules/${id}`, data).then((res) => {
			dispatch(scheduleSaveSuccess(res.data));
		});
	}
};

export const scheduleReset = () => (dispatch) => {dispatch(_scheduleReset())};