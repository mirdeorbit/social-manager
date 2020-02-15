const config = require('config');
const url = require('url');
const db = require('../../../../db');
const apis = require('../../../../utils/socials/api').apis;

module.exports = (router) => {
	router.get('/vk/login', (req, res) => {
		const urlParams = {
			client_id: config.socials.vk.app.clientID,
			redirect_uri: config.socials.vk.app.callbackURL,
			display: 'page',
			scope: 'friends,wall,status',
			response_type: 'token'
		};
		const authUrl = new url.URL(config.socials.vk.app.authorizationURL);
		const searchParams = new url.URLSearchParams(urlParams);
		authUrl.search = searchParams.toString();

		res.redirect(authUrl.toString());
	});

	router.get('/vk/callback', async (req, res) => {
		res.render('auth/callbackScript', {
			clientUrl: config.clientBaseUrl
		});
	});

	var validationRules = {
		access_token: {
			type: 'string',
			required: true
		},
		user_id: {
			type: 'integer',
			required: true
		},
		expires_in: {
			type: 'integer',
			required: true
		}
	};

	router.post('/vk/postUser', async(req, res) => {
		const params = req.validate(validationRules);

		const vkUser = await apis.vk.getUserById(params.access_token, req.body.user_id);
		const existingUser = await db.users.findOne({'socials.vk.id': vkUser.id});

		const token = Math.random().toString(36).substring(2);

		if (existingUser) {
			await db.users.updateOne({
				_id: existingUser._id
			}, {
				$set: {
					'socials.vk': {
						...vkUser,
						accessToken: params.access_token,
						expiresIn: params.expires_in,
						lastUpdateDate: new Date()
					},
					token: token
				}
			});
		} else {
			const user = {
				fullName: `${vkUser.first_name} ${vkUser.last_name}`,
				socials: {
					vk: {
						...vkUser,
						accessToken: params.access_token,
						expiresIn: params.expires_in,
						lastUpdateDate: newDate()
					}
				},
				token: token
			};
			await db.users.inserOne(user);
		}

		res.json({token: token});
	});
};