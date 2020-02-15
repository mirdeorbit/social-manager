const VkApi = require('./vk');

const apis = {};

exports.initialize = () => {
	apis.vk = new VkApi();
};

exports.apis = apis;