const db = require('../../../db');

module.exports = (router) => {
	router.get('/:_id', async (req, res, next) => {
		var result;
		try {
			result = await db.schedules.findOne({_id: parseInt(req.params._id)});
			res.json(result);
		} catch(err) {
			throw err;
		}
	})
};