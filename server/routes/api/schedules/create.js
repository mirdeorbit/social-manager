const db = require('../../../db');

module.exports = (router) => {
	router.post('/', async (req, res, next) => {
		try {
			const schedule = await db.schedules.findOne(req.body);
			var result;

			if (!schedule) {
				result = await db.schedules.insertOne(req.body);
			} else {
				await db.schedules.updateOne({
					_id: schedule._id
				}, {
					$set: req.body
				});
				result = db.schedules.findOne({_id: schedule._id});
			}
			res.json(result);
		} catch(err) {
			throw err;
		}
	})
};