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

export const currentUserGetError = (error) => {
	return { type: CURRENT_USER_GET_ERROR, error };
};

export const signin = (params, redirectToApp) => {
	return (dispatch) => {
		dispatch(currentUserGetStart());
		post(config.api.baseUrl + '/auth/signin', params).then((res) => {
			dispatch(currentUserGetSuccess(res.data));
			redirectToApp(res.data.token);
		}, (err) => {
			dispatch(currentUserGetError(err));
		});
	}
};

export const checkAuth = (params, redirectToLogin) => {
	return (dispatch) => {
		dispatch(currentUserGetStart(params));
		get(`${config.api.baseUrl}/users/me?token=${params.token}`).then((res) => {
			dispatch(currentUserGetSuccess(res.data));
			if (!res.data) {
				redirectToLogin();
			}
		}, (error) => {
			dispatch(currentUserGetError(error));
		});
	}
};