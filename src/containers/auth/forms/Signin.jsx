import React, { Component } from "react";
import SigninForm from "../../../components/auth/forms/Signin";

class SigninFormContainer extends Component {

    onSubmit(e) {
        e.preventDefault();

    }

    render() {
        return (
            <SigninForm
                onSubmit={this.onSubmit}
            />
        );
    };
}

export default SigninFormContainer;