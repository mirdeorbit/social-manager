import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from 'axios';
import config from '../../../config';

import SigninFormComponent from '../../../components/auth/forms/Signin';
import { signinStart, signinSuccess } from '../../../actions/auth';

class SigninFormContainer extends Component {

	constructor() {
		super();
		this.onSubmit = this.onSubmit.bind(this);
	}

    onSubmit (data, callback) {
        this.props.onSigninStart(data);
        console.log(config);
		post(config.api.baseUrl + '/auth/signin', {
			crossDomain: true
		}).then((res) => {
			console.log(res);
		})
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

const mapDispatchToProps = (dispatch) => ({
	onSigninStart: (params) => {
		dispatch(signinStart(params));
	},
	onSigninSuccess: (params) => {
		dispatch(signinSuccess(params));
	}
});

const SigninForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(SigninFormContainer);

export default SigninForm;