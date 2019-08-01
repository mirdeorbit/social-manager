import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Container, FormControl, InputLabel, OutlinedInput, Button } from "@material-ui/core";

const SigninForm = ({ onSubmit, initialValues = {} }) => (
    <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
            actions.setSubmitting(false);
        }}
    >
        <Container maxWidth="sm">
            <form onSubmit={onSubmit}>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="signin-email">Email address</InputLabel>
                    <OutlinedInput
                        id="signin-email"
                        name="email"
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="signin-password">Password</InputLabel>
                    <OutlinedInput
                        id="signin-password"
                        type="password"
                        name="password"
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <button
                        color="inherit"
                        type="submit"
                    >
                        Signin
                    </button>
                </FormControl>
            </form>
        </Container>
    </Formik>
);

SigninForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default SigninForm;