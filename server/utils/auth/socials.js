const _ = require('underscore');
const passport = require('passport');
const VkontakteStrategy = require('passport-vkontakte').Strategy;
const config = require('config');
const db = require('../../db');

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	db.users.findOne({_id: id}).then((user) => {
		done(user);
	}, (err) => {
		throw err;
	})
});

const vkProfileToUser = (profile, accessToken, refreshToken) => {
	return {
		fullName: profile.displayName,
		socials: {
			vk: _(profile)
				.chain()
				.omit('_raw', '_json')
				.extend({
					accessToken: accessToken,
					refreshToken: refreshToken
				}).value()
		}
	};
};

exports.init = function () {
	passport.use(new VkontakteStrategy(config.get('socials.vk.app'),
		function(accessToken, refreshToken, params, profile, done) {
			db.users.findOne({'socials.vk.id': profile.id}).then((user) => {
				var userData = vkProfileToUser(profile, accessToken, refreshToken);
				if (!user) {
					db.users.insertOne(userData, done);
				} else {
					db.users.updateOne({
						_id: user._id
					}, {
						$set: userData
					}).then(() => {
						db.users.findOne({_id: user._id}, done);
					});
				}
			});
		}
	));
};