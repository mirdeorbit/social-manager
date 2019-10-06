let config = {
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
	listen: {
		api: {
			hostname: '127.0.0.1',
			port: 3002
		}
	},
	socials: {
		vk: {
			appId: '12345',
			appSecret: 'sddfddd'
		}
	}
};

module.exports = config;