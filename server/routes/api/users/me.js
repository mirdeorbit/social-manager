const db = require('../../../db');

module.exports = (router) => {
	router.get('/me', async (req, res, next) => {
		try {
			if (req.user) {
				res.json(req.user);
			} else {
				res.status(401);
				res.json({error: 'Unauthorized'});
			}
		} catch(err) {
			throw err;
		}
	})
};