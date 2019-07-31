import React from "react";
import {Container, FormControl, InputLabel, OutlinedInput, Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const SigninForm = () => (
    <Container maxWidth="sm">
        <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="signin-email">Email address</InputLabel>
            <OutlinedInput id="signin-email" aria-describedby="signin-email-helper" />
        </FormControl>
        <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="signin-password">Password</InputLabel>
            <OutlinedInput id="signin-password" type="password" aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl margin="normal" fullWidth>
            <Button color="inherit">Signin</Button>
        </FormControl>
    </Container>
);

export default SigninForm;