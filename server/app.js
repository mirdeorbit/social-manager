const express = require('express');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const config = require('config');

const db = require('./db');
var bodyParser = require('body-parser');
var apiRouter = require('./routes/api');
var siteRouter = require('./routes/site');
var socialApi = require('./utils/socials/api');
var socialsAuth = require('./utils/auth/socials');

var reqValidate = require('./middleware/reqValidate');

const createApp = () => {
	const app = express();

	const whitelist = [
		'http://localhost:3000',
		'http://localhost:3002'
	];

	const corsOptions = {
		origin: (origin, callback) => {
			console.log(origin);
			if (!origin || whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		}
	};

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(bodyParser.json());
	app.use(morgan('combined'));
	app.use(cors(corsOptions));
	app.use(reqValidate());

	app.use('/', siteRouter.router);
	app.use('/api', apiRouter.router);

	socialsAuth.init();
	socialApi.init();

	return app;
};

const runApp = async (app) => {
	await db.init({
		config: config.get('mongodb')
	});

	const server = await app.listen(
		config.get('listen.api.port'),
		config.get('listen.api.hostname'),
	);
	module.exports = server;
	return app;
};

const app = createApp();

module.exports = app;

const createTestUser = async () => {
	const testUserData = {
		email: 'test@test.com',
		password: 'test12345',
		fullName: 'Test User'
	};
	const testUser = await db.users.findOne({email: testUserData.email});
	if (!testUser) {
		await db.users.insertOne(testUserData);
	}
};

runApp(app).then(() => {
	// create test user
	createTestUser().then(() => {
		console.log('Test user created');
		console.log(
			`Server is ready to accept requests on port: ${config.get('listen.api.port')}`
		);
	}, (err)=> {
		console.log(`Uncaught exception ${err}`);
	});
}, (err) => {
	console.log(`Uncaught exception ${err}`);
});

