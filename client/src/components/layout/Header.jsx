import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	Button,
	Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const HeaderText = () => (
	<h1>H1 compnent</h1>
);

const Header = () => {
	const classes = useStyles();
	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					News
				</Typography>

				<Button color="inherit" component={Link} to="/signin">
					Signin
				</Button>

				<Button color="inherit" component={Link} to="/signup">
					Signup
				</Button>

				<Button color="inherit" component={Link} to="/">
					Root
				</Button>

				<Button color="inherit" component={Link} to="/somepath">
					Somepath
				</Button>
			</Toolbar>
		</AppBar>
	)
};

export default Header;