import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ScheduleFormComponent from '../../../components/schedule/form';
import { scheduleGet } from '../../../../data/actionCreators/schedules';
import { schedulePatch, scheduleReset } from '../../../../data/actionCreators/schedules';

class ScheduleEditFormContainer extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onFirstPublicationTypeChange = this.onFirstPublicationTypeChange.bind(this);
		this.onChangeFromMomentDate = this.onChangeFromMomentDate.bind(this);

		this.state = {
			schedule: {},
			firstPublicationType: 'last'
		};
	}

	componentDidMount() {
		const { match, dispatch } = this.props;
		dispatch(scheduleGet(match.params.id));
	}

	componentDidUpdate(prevProps) {
		if (this.props.schedule && this.props.schedule.firstPublication && !prevProps.schedule) {
			this.setState({
				firstPublicationType: this.props.schedule.firstPublication.type
			});
		}
	}

	componentWillUnmount() {
		this.props.dispatch(scheduleReset());
	}

	onFirstPublicationTypeChange(event) {
		console.log(event.target.value);

		this.setState({
			firstPublicationType: event.target.value,
		});
	}

	onChangeFromMomentDate(value) {
		this.setState({
			fromMomentDate: value
		});
	}

	onSubmit(data, callback) {
		const { match, dispatch } = this.props;

		let resultData = { ...data };

		if (resultData.firstPublication.type === 'fromMoment') {
			resultData.firstPublication = _(resultData.firstPublication).omit('lastCount');
		} else {
			resultData.firstPublication = _(resultData.firstPublication).omit('fromMomentDate');
		}
		dispatch(schedulePatch(match.params.id, resultData));

		console.log(resultData);
		callback();
	}

	render() {
		const { schedule } = this.props;
		const { firstPublicationType, fromMomentDate } = this.state;

		return  (
			<ScheduleFormComponent
				schedule={schedule}
				onSubmit={this.onSubmit}
				onFirstPublicationTypeChange={this.onFirstPublicationTypeChange}
				onChangeFromMomentDate={this.onChangeFromMomentDate}
				fromMomentDate={fromMomentDate}
				firstPublicationType={firstPublicationType}
			/>
		)
	}
}

const mapStateToProps = (state) => ({
	schedule: state.schedule
});

export default connect(mapStateToProps)(ScheduleEditFormContainer);