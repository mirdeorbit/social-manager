import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';

import auth from './hocs/auth';
import Header from './components/layout/Header';
import Main from './containers/main';

function App() {
	const AuthComponent = auth(Main);
	//console.log(comp);
	return (
		<Router>
			<Header/>
			<AuthComponent/>
		</Router>
	);
}

export default App;
