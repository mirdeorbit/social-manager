import React from "react";
import {Button, Container, FormControl, InputLabel, OutlinedInput} from "@material-ui/core";

const SignupForm = () => (
	<Container maxWidth="sm">
		<FormControl margin="normal" fullWidth>
			<InputLabel htmlFor="my-input">Email address</InputLabel>
			<OutlinedInput id="my-input" aria-describedby="my-helper-text" />
		</FormControl>
		<FormControl margin="normal" fullWidth>
			<InputLabel htmlFor="my-input">Password</InputLabel>
			<OutlinedInput id="my-input" type="password" aria-describedby="my-helper-text" />
		</FormControl>
		<FormControl margin="normal" fullWidth>
			<InputLabel htmlFor="my-input">Repeat password</InputLabel>
			<OutlinedInput id="my-input" type="password" aria-describedby="my-helper-text" />
		</FormControl>
		<FormControl margin="normal" fullWidth>
			<Button color="inherit">SignUp</Button>
		</FormControl>
	</Container>
);

export default SignupForm;