import React, { Component } from 'react';
import ScheduleFormComponent from '../../../components/schedule/form';
import { scheduleCreate } from '../../../data/actionCreators/schedules';
import { connect } from 'react-redux';

class ScheduleCreateFormContainer extends Component {

	constructor() {
		super();
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(data, callback) {
		console.log(data);
		const { dispatch } = this.props;
		dispatch(scheduleCreate(data));
		callback();
	}

	render() {
		return (
			<ScheduleFormComponent
				onSubmit={this.onSubmit}
			/>
		)
	}
}

ScheduleCreateFormContainer.propTypes = {};

ScheduleCreateFormContainer.defaultProps = {
	schedule: {}
};

export default connect()(ScheduleCreateFormContainer);