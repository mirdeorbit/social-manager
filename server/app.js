const express = require('express');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const config = require('config');

var bodyParser = require('body-parser');

const db = require('./db');

const jobs = require('./utils/jobs');

const ensureUser = require('./middleware/ensureUser');
const reqValidate = require('./middleware/reqValidate');

const socialsApi = require('./utils/socials/api');

const apiRouter = require('./routes/api');
const siteRouter = require('./routes/site');

const sessionParams = {
	secret: '1ac2e899cd1e1aac4819',
	proxy: true,
	resave: true,
	saveUninitialized: true
};

const createApp = () => {
	const app = express();

	const corsOptions = {
		origin: (origin, callback) => {
			if (!origin || config.whiteList.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		}
	};

	app.set('view engine', 'pug');
	app.set('views','./views');

	app.use(passport.initialize());
	app.use(passport.session(sessionParams));

	app.use(bodyParser.json());
	app.use(morgan('combined'));
	app.use(cors(corsOptions));
	app.use(reqValidate());

	app.use(ensureUser());

	socialsApi.initialize();

	jobs.init();

	app.use('/', siteRouter.router);
	app.use('/api', apiRouter.router);

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

