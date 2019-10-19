const path = require('path');
const _ = require('underscore');

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
	env,
	api: {
		baseUrl: 'http://127.0.0.1:3002/api'
	},
	site: {
		baseUrl: 'http://127.0.0.1:3002'
	}
};

export default () => baseConfig;
