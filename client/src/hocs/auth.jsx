import _ from 'underscore';
import qs from 'qs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Auth from '../pages/containers/auth';
import { checkAuth } from '../data/actionCreators/auth';

import * as AuthPropTypes from '../data/propTypes/auth';

function withAuth(WrappedComponent) {
	class AuthenticatedContainer extends Component {

		constructor() {
			super();

			this.redirectToLogin = this.redirectToLogin.bind(this);
		}

		redirectToLogin() {
			this.props.history.push('/signin');
		}

		componentWillMount() {
			let token;
			const query = qs.parse(window.location.href.split('?')[1]);

			if (query.token) {
				token = query.token;
				localStorage.setItem('currentUserToken', token);
			} else {
				token = localStorage.getItem('currentUserToken');
			}

			if (!token) {
				this.redirectToLogin()
			} else {
				this.props.dispatch(checkAuth({
					token: token
				}, this.redirectToLogin));
			}
		}

		render() {
			const { currentUser } = this.props;

			return !currentUser ? (
				<Auth/>
			) : (
				<WrappedComponent
					{...this.props}
					logout={_.noop()}
				/>
			);
		}
	}

	AuthenticatedContainer.propTypes = {
		currentUser: AuthPropTypes.User
	};

	AuthenticatedContainer.defaultProps = {
		currentUser: null
	};

	const mapStateToProps = (state) => ({
		currentUser: state.currentUser
	});

	return withRouter(connect(mapStateToProps)(AuthenticatedContainer));
}

export default withAuth;