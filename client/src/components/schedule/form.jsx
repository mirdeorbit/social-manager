import React from 'react';
import { Formik, Form, Field } from 'formik';

import {
	Container,
	FormControl, TextField
} from '@material-ui/core';

const ScheduleComponent = ({ schedule, onSubmit }) => {
	schedule = schedule || {};

	return (
		<Formik
			enableReinitialize
			initialValues={schedule}
			onSubmit={( values, { setSubmitting } ) => {
				onSubmit(values, () => {
					setSubmitting(false);
				});
			}}
		>
			{(props) => (
				<Container maxWidth='sm'>
					<h1>Fill your schedule</h1>
					<Form onSubmit={props.handleSubmit}>
						<FormControl margin='normal' fullWidth>
							<Field
								name='sourceGroup'
								render={({ field }) => (
									<TextField
										id='source-group'
										name='sourceGroup'
										label='Source group'
										onChange={field.onChange}
										value={field.value || ''}
									/>
								)}
							/>

						</FormControl>
						<FormControl margin='normal' fullWidth>
							<Field
								name='targetGroup'
								render={({ field }) => (
									<TextField
										id='target-group'
										name='targetGroup'
										label='Target group'
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
								disabled={props.isSubmitting}
							>
								Submit
							</button>
						</FormControl>
					</Form>
				</Container>
			)}
		</Formik>
	)
};

ScheduleComponent.propTypes = {};

ScheduleComponent.defaultProps = {
	schedule: {}
};

export default ScheduleComponent;