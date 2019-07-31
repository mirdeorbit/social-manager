import React from 'react';
import {
    BrowserRouter as Router,
	Route
} from "react-router-dom";

import Header from "./components/layout/Header";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup"

function App() {
	return (
	    <Router>
            <Header/>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
        </Router>
	);
}

export default App;
