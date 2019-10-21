import React from 'react';
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
			value={field.value || new Date()}
			onChange={(value) => {form.setFieldValue('fromMomentDate', value)}}
			KeyboardButtonProps={{
				'aria-label': 'change date',
			}}
		/>
	)
};

const ScheduleComponent = ({
   schedule, onSubmit, onTimeTypeChange, showCalendar
}) => {
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

						<Field
							name='timeType'
							render={({ field }) => (
								<div style={{width: '100%'}}>
									<FormControl>
										<RadioGroup
											aria-label='timeType'
											name='timeType'
											value={field.value || ''}
											onChange={(value) => {
												field.onChange(value);
												onTimeTypeChange(value);
											}}
										>
											<FormControlLabel value='new' control={<Radio />} label='Только новые' />
											<FormControlLabel value='fromMoment' control={<Radio />} label='С момента' />
										</RadioGroup>
									</FormControl>
								</div>
							)}
						/>

						{showCalendar && (
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid container justify='space-around'>
									<Field name='fromMomentDate' component={Datepicker}/>
								</Grid>
							</MuiPickersUtilsProvider>
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