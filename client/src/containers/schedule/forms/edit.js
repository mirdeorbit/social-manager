import React, {Component} from 'react';
import { connect } from 'react-redux';

import EditFormComponent from '../../../components/schedule/form';
import { scheduleGet } from '../../../data/actionCreators/schedules';
import { schedulePatch, scheduleReset } from '../../../data/actionCreators/schedules';

class ScheduleEditFormContainer extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSourceGroupChange = this.onSourceGroupChange.bind(this);

		this.state = {
			schedule: {}
		};
	}

	componentDidMount() {
		const { match, dispatch } = this.props;
		dispatch(scheduleGet(match.params.id));
	}

	componentWillUnmount() {
		this.props.dispatch(scheduleReset());
	}

	onSubmit(data, callback) {
		const { match, dispatch } = this.props;
		dispatch(schedulePatch(match.params.id, data));
		callback();
	}

	onSourceGroupChange(event) {
		this.setState({schedule: {
			...this.props.schedule,
			sourceGroup: event.target.value
		}})
	}

	render() {
		const { schedule } = this.props;

		return  (
			<EditFormComponent
				schedule={schedule}
				onSubmit={this.onSubmit}
				onSourceGroupChange={this.onSourceGroupChange}
			/>
		)
	}
}

const mapStateToProps = (state) => ({
	schedule: state.schedule
});

export default connect(mapStateToProps)(ScheduleEditFormContainer);