var EasyVk = require('easyvk');
var config = require('config');

exports.init = () => {
	if (!exports.vk) {
		console.log('create vkontakte api');
		const vk = new EasyVk(config.get('socials.vk'));

		vk.on('serverTokenReady', function(_o) {
			// Here will be server access token
			console.log('serverTokenReady >>> ', _o);
			vk.setToken(_o.access_token);
		});

		exports.vk = vk;
	}
};