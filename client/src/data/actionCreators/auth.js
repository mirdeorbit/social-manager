import { post, get } from 'axios';
import config from '../../config';

export const CURRENT_USER_GET_START = 'CURRENT_USER_GET_START';
export const CURRENT_USER_GET_SUCCESS = 'CURRENT_USER_GET_SUCCESS';
export const CURRENT_USER_GET_ERROR = 'CURRENT_USER_GET_ERROR';

export const currentUserGetStart = (params) => {
	return { type: CURRENT_USER_GET_START, params };
};

export const currentUserGetSuccess = (currentUser) => {
	return { type: CURRENT_USER_GET_SUCCESS, currentUser };
};

export const currentUserGetError = (currentUser) => {
	return { type: CURRENT_USER_GET_ERROR, currentUser };
};

export const signin = (params, redirectToApp) => {
	return (dispatch) => {
		dispatch(currentUserGetStart());
		post(config.api.baseUrl + '/auth/signin', params).then((res) => {
			dispatch(currentUserGetSuccess(res.data));
			redirectToApp();
		}, (err) => {
			dispatch(currentUserGetError(err));
		});
	}
};

export const checkAuth = (params, redirectToLogin) => {
	return (dispatch) => {
		dispatch(currentUserGetStart(params));
		get(config.api.baseUrl + '/users/me').then((res) => {
			dispatch(currentUserGetSuccess(res.data));
			console.log(res.data);
			if (!res.data) {
				redirectToLogin();
			}
		}, (err) => {
			dispatch(currentUserGetError(err));
		});
	}
};