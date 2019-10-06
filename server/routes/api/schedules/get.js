const db = require('../../../db');

module.exports = (router) => {
	router.get('/', async (req, res, next) => {
		var result;
		try {
			result = await db.schedules.find().toArray();
			res.json(result);
		} catch(err) {
			throw err;
		}
	})
};