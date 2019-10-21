const VkApi = require('./vk');

const apis = {};

exports.initialize = () => {
	apis.vk = new VkApi();

	console.log(apis.vk.getGroup)
};

exports.apis = apis;