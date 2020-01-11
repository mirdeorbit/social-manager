const _ = require('underscore');
const db = require('../../../db');
const socialsHelpers = require('../../../utils/helpers').socials;

var validationRules = {
	_id: {
		type: 'integer',
		required: true
	},
	source: {
		type: 'string',
		required: true
	},
	target: {
		type: 'string',
		required: true
	},
	firstPublication:{
		type: 'object',
		properties: {
			type: {
				type: 'string',
				enum: ['last', 'fromMoment']
			},
			lastCount: {
				type: 'integer'
			},
			fromMomentDate: {
				type: 'date'
			}
		}
	}
};

module.exports = (router) => {
	router.patch('/:_id', async (req, res, next) => {
		var params = req.validate(validationRules);

		let patchData = _({}).extend(params);

		try {
			patchData.sourceExtended =
				await socialsHelpers.getUserOrGroupExtendedInfo(
					req.user.socials.vk.accessToken,
					_(params.source.split('/')).last()
				);
			patchData.targetExtended =
				await socialsHelpers.getUserOrGroupExtendedInfo(
					req.user.socials.vk.accessToken,
					_(params.target.split('/')).last()
				);
		} catch(err) {
			res.status(500);
			res.json({error: err.message});
			return;
		}

		if (!patchData.sourceExtended) {
			res.status(500);
			res.json('Source error');
			return;
		}

		if (!patchData.targetExtended) {
			res.status(500);
			res.json('Target error');
			return;
		}

		try {
			const schedule = await db.schedules.findOne({_id: params._id});
			var result;
			if (!schedule) {
				res.status(404);
				res.json({error: 'Schedule not found'});
			} else {
				await db.schedules.updateOne({
					_id: Number(req.params._id)
				}, {
					$set: patchData
				});
				result = db.schedules.findOne({_id: params._id});
			}
			res.json(result);
		} catch(err) {
			next(err);
		}
	})
};