import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SigninFormComponent from '../../../components/auth/forms/Signin';
import { signin } from '../../../../data/actionCreators/auth';

class SigninFormContainer extends Component {
	constructor() {
		super();
		this.onSubmit = this.onSubmit.bind(this);
		this.redirectToApp = this.redirectToApp.bind(this);
	}

	redirectToApp(token) {
		console.log(token);
		localStorage.setItem('currentUserToken', token);
		this.props.history.push('/');
	}

	onSubmit (data, callback) {
		this.props.dispatch(signin(data, this.redirectToApp));
		callback();
	}

	render() {
		return (
			<SigninFormComponent
				onSubmit={this.onSubmit}
			/>
		);
	};
}

const mapStateToProps = (state) => ({
	currentUser: state.currentUser
});

const SigninForm = withRouter(connect(
	mapStateToProps,
	null
)(SigninFormContainer));

export default SigninForm;