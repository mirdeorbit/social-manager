import _ from 'underscore';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Auth from '../containers/auth';

function withAuth(WrappedComponent) {
	class AuthenticatedContainer extends Component {
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

	return connect(mapStateToProps, null)(AuthenticatedContainer);
}

export default withAuth;