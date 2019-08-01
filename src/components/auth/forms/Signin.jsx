import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Container, FormControl, InputLabel, OutlinedInput, Button } from "@material-ui/core";

const SigninForm = ({ onSubmit, initialValues = {} }) => (
    <Formik
        initialValues={initialValues}
        onSubmit={( values, { setSubmitting } ) => {
            onSubmit(values, () => {
                setSubmitting(false);
            });
        }}
        render={(props) => (
            <Container maxWidth="sm">
                <Form onSubmit={props.handleSubmit}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="signin-email">Email address</InputLabel>
                        <OutlinedInput
                            id="signin-email"
                            name="email"
                            onChange={props.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="signin-password">Password</InputLabel>
                        <OutlinedInput
                            id="signin-password"
                            type="password"
                            name="password"
                            onChange={props.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <button
                            color="inherit"
                            type="submit"
                            disabled={props.isSubmitting}
                        >
                            Signin
                        </button>
                    </FormControl>
                </Form>
            </Container>
        )}
    />
);

SigninForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default SigninForm;