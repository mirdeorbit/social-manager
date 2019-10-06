import React, {Component} from 'react';
import ScheduleForm from '../../components/schedule/form';
import { post } from 'axios';
import config from '../../config';

class ScheduleContainer extends Component {

	constructor() {
		super();
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit (data, callback) {
		console.log(data);
		post(config.api.baseUrl + '/schedules', data).then((res) => {
			callback();
		}, (err) => {
			throw err;
			callback();
		});
	}

	render() {
		return (
			<ScheduleForm
				onSubmit={this.onSubmit}
			/>
		)
	}
};

ScheduleContainer.propTypes = {};

ScheduleContainer.defaultProps = {
	schedule: {}
};

export default ScheduleContainer;