const passport = require('passport');
const config = require('config');

const db = require('../../../../db');

module.exports = (router) => {
	router.get('/vk/login', passport.authenticate('vkontakte'));

	router.get('/vk/callback',
		passport.authenticate('vkontakte', {
			failureRedirect: `${config.get('clientBaseUrl')}/signin?error=loginFailed`
		}),
		async (req, res) => {
			const token = Math.random().toString(36).substring(2);
			await db.users.updateOne({_id: req.user._id}, {$set: {token: token}});
			res.redirect(`${config.get('clientBaseUrl')}?token=${token}`);
		}
	)
};