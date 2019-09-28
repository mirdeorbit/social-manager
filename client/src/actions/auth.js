export const SIGNIN_START = 'SIGNIN_START';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';

export function signinStart({ email, password }) {
	return { type: SIGNIN_START, email, password };
}

export function signinSuccess(userData) {
	return { type: SIGNIN_SUCCESS, userData };
}