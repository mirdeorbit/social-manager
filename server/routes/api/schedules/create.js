const _ = require('underscore');
const db = require('../../../db');
const socialsHelpers = require('../../../utils/helpers').socials;

var validationRules = {
	source: {
		type: 'string',
		required: true
	},
	target: {
		type: 'string',
		required: true
	}
};

module.exports = (router) => {
	router.post('/', async (req, res) => {
		var params = req.validate(validationRules);
		let createData = _({}).extend(params);

		try {
			createData.sourceExtended =
				await socialsHelpers.getUserOrGroupExtendedInfo(
					req.user.socials.vk.accessToken,
					_(params.source.split('/')).last()
				);
			createData.targetExtended =
				await socialsHelpers.getUserOrGroupExtendedInfo(
					req.user.socials.vk.accessToken,
					_(params.target.split('/')).last()
				);
		} catch(err) {
			res.status(500);
			res.json({error: err.message});
			return;
		}

		if (!createData.sourceExtended) {
			res.status(500);
			res.json('Source error');
			return;
		}

		if (!createData.targetExtended) {
			res.status(500);
			res.json('Target error');
			return;
		}

		try {
			const result = await db.schedules.insertOne(createData);
			res.json(result);
		} catch(err) {
			throw err;
		}
	})
};