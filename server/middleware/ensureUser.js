const _ = require('underscore');
const db = require('../db');

module.exports = () => (req, res, next) => {
	let token;
	if (req.query.token) {
		token = req.query.token;
		req.query = _(req.query).omit('token');
	}
	if (req.body.token) {
		token = req.body.token || req.query.token;
		req.body = _(req.body).omit('token');
	}


	db.users.findOne({token: token}).then((user) => {
		req.user = user;
		next()
	}, () => {
		next();
	});
};