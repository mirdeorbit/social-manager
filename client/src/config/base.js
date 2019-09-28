const path = require('path');
const _ = require('underscore');

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
	env,
	api: {
		baseUrl: 'http://127.0.0.1:3002/api/1.0'
	}
};

export default () => baseConfig;
