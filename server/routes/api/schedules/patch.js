const db = require('../../../db');
const vkApi = require('../../../utils/socials/api').vk;

module.exports = (router) => {
	router.patch('/:_id', async (req, res, next) => {
		try {
			const schedule = await db.schedules.findOne({_id: Number(req.params._id)});
			var result;
			if (!schedule) {
				next(new Error('Not Found'));
			} else {
				await db.schedules.updateOne({
					_id: Number(req.params._id)
				}, {
					$set: req.body
				});
				result = db.schedules.findOne({_id: Number(req.params._id)});
			}
			await res.json(result);
		} catch(err) {
			next(err);
		}
	})
};