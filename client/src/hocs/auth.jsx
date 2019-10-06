import _ from 'underscore';
import React, { Component } from 'react';
import { get } from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Auth from '../containers/auth';
import { checkAuth } from '../data/actionCreators/auth';

function withAuth(WrappedComponent) {
	class AuthenticatedContainer extends Component {

		constructor() {
			super();

			this.redirectToLogin = this.redirectToLogin.bind(this);
		}

		redirectToLogin() {
			this.props.history.push('/signin');
		}

		componentDidMount() {
			this.props.dispatch(checkAuth({
				token: '91ac2bze416ert917op0eq1e3'
			}, this.redirectToLogin));
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

	const mapStateToProps = (state) => ({
		currentUser: state.currentUser
	});

	return withRouter(connect(mapStateToProps)(AuthenticatedContainer));
}

export default withAuth;