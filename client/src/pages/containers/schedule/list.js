import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import config from '../../../config';
import ScheduleListComponent from '../../components/schedule/list';
import { schedulesFetch } from '../../../data/actionCreators/schedules';

class ScheduleListContainer extends Component {

	static propTypes = {
	};

	static defaultProps = {
		schedules: []
	};

	constructor() {
		super();
		this.createHandleClick = this.createHandleClick.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(schedulesFetch({ userId: this.props.currentUser._id}));
	}

	createHandleClick(id) {
		const { history } = this.props;
		return () => {
			history.push('/edit/' + id);
		}
	}

	render() {
		const { schedules } = this.props;

		return (
			<ScheduleListComponent
				onSubmit={this.onSubmit}
				items={schedules}
				createHandleClick={this.createHandleClick}
			/>
		)
	}
};

const mapStateToProps = (state) => ({
	schedules: state.schedules,
	currentUser: state.currentUser
});

const ScheduleList = withRouter(connect(
	mapStateToProps
)(ScheduleListContainer));

export default ScheduleList;