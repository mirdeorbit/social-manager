import React from 'react';
import { Route } from 'react-router-dom';
import ScheduleList from '../schedule/list';
import ScheduleEditForm from '../schedule/forms/edit';

const Main = () => {
	return (
		<div>
			<Route exact path='/' component={ScheduleList} />
			<Route exact path='/edit/:id' component={ScheduleEditForm} />
		</div>
	)
};

export default Main;