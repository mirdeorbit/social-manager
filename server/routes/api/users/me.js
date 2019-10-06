const db = require('../../../db');

module.exports = (router) => {
	const user = {
		email: 'john@smith.com',
		token: '91ac2bze416ert917op0eq1e3'
	};

	router.get('/me', async (req, res, next) => {
		res.json(null);
	})
};