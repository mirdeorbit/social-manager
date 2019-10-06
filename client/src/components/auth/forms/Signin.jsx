import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Container, FormControl, TextField } from '@material-ui/core';
import * as Yup from "yup";

const SigninSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email')
		.required('Required'),
});

const SigninForm = ({ onSubmit, initialValues = {} }) => (
	<Formik
		initialValues={initialValues}
		validationSchema={SigninSchema}
		onSubmit={( values, { setSubmitting } ) => {
			onSubmit(values, () => {
				setSubmitting(false);
			});
		}}
	>
		{({ errors, handleSubmit, handleChange, touched, isSubmitting }) => (
			<Container maxWidth='sm'>
				<Form onSubmit={handleSubmit}>
					<FormControl margin='normal' fullWidth>
						<TextField

							id='signin-email'
							name='email'
							label='Email'
							onChange={handleChange}
						/>
						{errors.email ? <div>{errors.email}</div> : null}
					</FormControl>
					<FormControl margin='normal' fullWidth>
						<TextField
							id='signin-password'
							type='password'
							name='password'
							label='Password'
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl margin='normal' fullWidth>
						<button
							color='inherit'
							type='submit'
							disabled={isSubmitting}
						>
							Signin
						</button>
					</FormControl>
				</Form>
			</Container>
		)}
	</Formik>
);

SigninForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default SigninForm;