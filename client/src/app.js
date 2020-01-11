import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';

import auth from './hocs/auth';
import Header from './pages/components/layout/Header';
import Main from './pages/containers/main';

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
