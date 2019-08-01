import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "./containers/auth";
import Header from "./components/layout/Header";

function App() {
	return (
	    <Router>
            <Header/>
            <Auth/>
        </Router>
	);
}

export default App;
