

const db = require('../../../db');
const vkApi = require('../../../utils/socials/api').vk;

var validationRules = {
	_id: {
		type: 'integer',
		required: true
	},
	sourceGroup: {
		type: 'string',
		required: true
	},
	targetGroup: {
		type: 'string',
		required: true
	}
};

module.exports = (router) => {
	router.patch('/:_id', async (req, res, next) => {
		var params = req.validate(validationRules);
		console.log(params);
		try {

			const schedule = await db.schedules.findOne({_id: Number(req.params._id)});
			var result;
			if (!schedule) {
				res.setStatus(404);
				res.json({error: 'Schedule not found'});
			} else {
				await db.schedules.updateOne({
					_id: Number(req.params._id)
				}, {
					$set: req.body
				});
				result = db.schedules.findOne({_id: Number(req.params._id)});
			}
			res.json(result);
		} catch(err) {
			next(err);
		}
	})
};