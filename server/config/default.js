const config = {
	mongodb: {
		url: 'mongodb://127.0.0.1:27017/social-manager',
		options: {
			bufferMaxEntries: 0,
			w: 1,
			j: true,
			reconnectTries: Number.MAX_SAFE_INTEGER,
			reconnectInterval: 1000
		}
	},
	clientBaseUrl: 'http://localhost:3000',
	listen: {
		api: {
			hostname: '127.0.0.1',
			port: 3002
		}
	},
	socials: {
		vk: {
			app: {
				clientID: '7162533',
				clientSecret: '3ce8buBEy4uoX3Hxe4Ro',
				authorizationURL: 'https://oauth.vk.com/authorize',
				tokenURL: 'https://oauth.vk.com/access_token',
				callbackURL: 'http://127.0.0.1:3002/auth/socials/vk/callback'
			},
			api: {
				baseUrl: 'https://api.vk.com/method',
				version: '5.102'
			}

		},
	}
};

module.exports = config;