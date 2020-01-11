import React from 'react';
import moment from 'moment';

import { Formik, Form, Field } from 'formik';

import {
	Container,
	FormControl,
	TextField,
	FormControlLabel,
	RadioGroup,
	Radio,
	Grid
} from '@material-ui/core';

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

const Datepicker = ({ field, form }) => {
	return (
		<KeyboardDatePicker
			autoOk
			disableToolbar
			variant='inline'
			format='MM/dd/yyyy'
			margin='normal'
			id='from-moment-date'
			label='Дата'
			value={field.value}
			onChange={(value) => {form.setFieldValue('firstPublication.fromMomentDate', value)}}
			KeyboardButtonProps={{
				'aria-label': 'change date',
			}}
		/>
	)
};

const ScheduleComponent = ({
   schedule, onSubmit, onFirstPublicationTypeChange, firstPublicationType
}) => {
	schedule = schedule || {};

	const initialValues = {
		firstPublication: {
			type: firstPublicationType,
			fromMomentDate: new Date()
		},
		...schedule
	};

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
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
								name='source'
								render={({ field }) => (
									<TextField
										id='source'
										name='source'
										label='Source'
										onChange={field.onChange}
										value={field.value || ''}
									/>
								)}
							/>

						</FormControl>
						<FormControl margin='normal' fullWidth>
							<Field
								name='target'
								render={({ field }) => (
									<TextField
										id='target'
										name='target'
										label='Target'
										onChange={field.onChange}
										value={field.value || ''}
									/>
								)}
							/>
						</FormControl>

						<h2>Первая публикация</h2>

						<Field
							name='firstPublication.type'
							render={({ field }) => {
								return (
									<RadioGroup
										aria-label='firstPublication.type'
										name='firstPublication.type'
										value={field.value || ''}
										onChange={(value) => {
											onFirstPublicationTypeChange(value);
											field.onChange(value);
										}}
									>
										<FormControlLabel value='last' control={<Radio/>} label='Последние несколько'/>
										<FormControlLabel value='fromMoment' control={<Radio/>} label='С момента'/>
									</RadioGroup>
								)
							}}
						/>

						{firstPublicationType === 'fromMoment' && (
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid container justify='space-around'>
									<Field name='firstPublication.fromMomentDate' component={Datepicker}/>
								</Grid>
							</MuiPickersUtilsProvider>
						)}

						{firstPublicationType === 'last' && (
							<FormControl margin='normal' fullWidth>
								<Field
									name='firstPublication.lastCount'
									render={({ field }) => (
										<TextField
											id='firstPublication.lastCount'
											name='firstPublication.lastCount'
											label='Last publications count'
											onChange={field.onChange}
											value={field.value || ''}
										/>
									)}
								/>
							</FormControl>
						)}

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