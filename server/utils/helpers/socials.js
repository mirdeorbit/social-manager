const apis = require('../socials/api').apis;

exports.getUserOrGroupExtendedInfo = async (accessToken, id) => {
	let extendedInfo;
	const group = await apis.vk.getGroupById(accessToken, id);
	const user = await apis.vk.getUserById(accessToken, id);

	if (group) {
		extendedInfo = {
			id: group.id,
			type: 'group',
			title: group.name,
			screenName: group.screen_name,
			photo: group.photo_200
		};
	}

	if (user) {
		extendedInfo = {
			id: user.id,
			type: 'user',
			title: [user.first_name, user.last_name].join(' '),
			photo: user.photo_max
		}
	}

	return extendedInfo;
};