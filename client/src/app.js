import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';

import auth from './hocs/auth';
import Header from './components/layout/Header';

function App() {
	const AuthComponent = auth(<h1>Helo World! </h1>);
	//console.log(comp);
	return (
		<Router>
			<Header/>
			<AuthComponent/>
		</Router>
	);
}

export default App;
