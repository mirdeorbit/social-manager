const db = require('../../../db');

module.exports = (router) => {
	router.get('/me', async (req, res, next) => {
		if (!req.query.token) {
			throw new Error('User token is required')
		}

		try {
			const user = await db.users.findOne({token: req.query.token});

			if (user) {
				res.json(user);
			} else {
				throw new Error('User not found')
			}
		} catch(err) {
			throw err;
		}
	})
};