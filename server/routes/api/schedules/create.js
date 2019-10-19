const db = require('../../../db');

module.exports = (router) => {
	router.post('/', async (req, res) => {
		try {
			const result = await db.schedules.insertOne(req.body);
			res.json(result);
		} catch(err) {
			throw err;
		}
	})
};