import React, {Component} from 'react';
import { connect } from 'react-redux';

import ScheduleFormComponent from '../../../components/schedule/form';
import { scheduleGet } from '../../../data/actionCreators/schedules';
import { schedulePatch, scheduleReset } from '../../../data/actionCreators/schedules';

class ScheduleEditFormContainer extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onTimeTypeChange = this.onTimeTypeChange.bind(this);
		this.onChangeFromMomentDate = this.onChangeFromMomentDate.bind(this);

		this.state = {
			schedule: {},
			showCalendar: false
		};
	}

	componentDidMount() {
		console.log(new Date().toISOString().split('.')[0]);
		const { match, dispatch } = this.props;
		dispatch(scheduleGet(match.params.id));
	}

	componentWillUnmount() {
		this.props.dispatch(scheduleReset());
	}

	onTimeTypeChange(event) {
		this.setState({
			showCalendar: event.target.value === 'fromMoment'
		})
	}

	onChangeFromMomentDate(value) {
		this.setState({
			fromMomentDate: value
		});
	}

	onSubmit(data, callback) {
		const { match, dispatch } = this.props;
		console.log(data);
		// dispatch(schedulePatch(match.params.id, data));
		callback();
	}

	render() {
		const { schedule } = this.props;
		const { showCalendar, fromMomentDate } = this.state;

		return  (
			<ScheduleFormComponent
				schedule={schedule}
				showCalendar={showCalendar}
				onSubmit={this.onSubmit}
				onTimeTypeChange={this.onTimeTypeChange}
				onChangeFromMomentDate={this.onChangeFromMomentDate}
				fromMomentDate={fromMomentDate}
			/>
		)
	}
}

const mapStateToProps = (state) => ({
	schedule: state.schedule
});

export default connect(mapStateToProps)(ScheduleEditFormContainer);