import React from 'react';
import PropTypes from 'prop-types';
import {Formik, Form, Field} from 'formik';
import { Container, FormControl, TextField, Link } from '@material-ui/core';
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
		{({ errors, handleSubmit, isSubmitting }) => (
			<Container maxWidth='sm'>
				<Form onSubmit={handleSubmit}>
					<FormControl margin='normal' fullWidth>
						<Field
							name='email'
							render={({ field }) => (
								<TextField
									id='signin-email'
									name='email'
									label='Email'
									onChange={field.onChange}
									value={field.value || ''}
								/>
							)}
						/>
						{errors.email ? <div>{errors.email}</div> : null}
					</FormControl>
					<FormControl margin='normal' fullWidth>
						<Field
							name='password'
							render={({ field }) => (
								<TextField
									id='signin-password'
									type='password'
									name='password'
									label='Password'
									onChange={field.onChange}
									value={field.value || ''}
								/>
							)}
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

					<FormControl margin='normal' fullWidth>
						<Link
							href='http://127.0.0.1:3002/auth/socials/vk/login'
						>
							Login VK
						</Link>
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