const _ = require('underscore');
const db = require('../../../db');

const validationRules = {
	email: {
		type: 'string',
		required: true
	},
	password: {
		type: 'string',
		required: true
	}
};

module.exports = (router) => {
	router.post('/signin', async (req, res, next) => {
		const params = req.validate(validationRules);

		try {
			let user = await db.users.findOne({
				email: params.email,
				password: params.password
			});
			if (user) {
				const token = Math.random().toString(36).substring(2);
				user = _({token: token}).defaults(user);
				await db.users.updateOne({
					_id: user._id
				}, {
					$set: {token: token}
				});
				res.json(user);
			} else {
				res.status(401);
				res.json({error: 'User with given credentials not found'});
			}
		} catch (err) {
			throw err;
		}
	});
};