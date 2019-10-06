const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('config');

const db = require('./db');
var bodyParser = require('body-parser');
var apiRouter = require('./routes/api');
var socialApi = require('./utils/socials/api');

const createApp = () => {
	const app = express();

	const whitelist = ['http://localhost:3000'];

	const corsOptions = {
		origin: (origin, callback) => {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		}
	};

	app.use(bodyParser.json());
	app.use(morgan('combined'));
	app.use(cors(corsOptions));
	app.use('/api', apiRouter.router);

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

runApp(app).then(() => {
	console.log(
		`Server is ready to accept requests on port: ${config.get('listen.api.port')}`
	);
}, (err) => {
	console.log(`Uncaught exception ${err}`);
});

