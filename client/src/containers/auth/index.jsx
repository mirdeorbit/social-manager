import React from "react";
import { Route } from "react-router-dom";

import SigninFormContainer from "./forms/Signin";
import SignupFormContainer from "./forms/Signup";

const Auth = () => {
    return (
        <div>
            <Route path="/signin" component={SigninFormContainer} />
            <Route path="/signup" component={SignupFormContainer} />
        </div>
    );
};

export default Auth;