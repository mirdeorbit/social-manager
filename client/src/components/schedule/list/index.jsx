import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Container } from '@material-ui/core';

const ScheduleList = ({ items, createHandleClick }) => {
	items = items || [];

	return (
		<Container>
			<List>
				{items.map(item => {
					return (
						<ListItem button onClick={createHandleClick(item._id)} key={item._id}>
							<ListItemText id={item._id} primary={`Репост из ${item.source} в ${item.target}`} />
							<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="comments">
									<DeleteIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</Container>
	)
};

ScheduleList.propTypes = {

};

export default ScheduleList;

