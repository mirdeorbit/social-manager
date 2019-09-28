import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Container, FormControl, InputLabel, OutlinedInput, TextField } from "@material-ui/core";

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
						<TextField
							id="signin-email"
							name="email"
							label="Email"
							onChange={props.handleChange}
						/>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            id="signin-password"
                            type="password"
                            name="password"
							label="Password"
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