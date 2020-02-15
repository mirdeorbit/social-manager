const config = require('config');
const request = require('request-promise');

class VkApi {
	//'https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V'
	constructor() {
		this.apiBaseUrl = config.get('socials.vk.api.baseUrl');
		this.apiVersion = config.get('socials.vk.api.version');
	}

	async getGroupById(accessToken, groupId) {
		const url = `${this.apiBaseUrl}/groups.getById?access_token=${accessToken}&v=${this.apiVersion}`;
		const requestParams = {
			url: url,
			body: `group_ids=${groupId}`
		};
		let data = await request.post(requestParams);
		data = JSON.parse(data);

		if (data.error) {
			console.log(data.error);
		}

		return !data.error ? data.response.length && data.response[0] : null;
	}

	async getUserById(accessToken, userId) {
		const url = `${this.apiBaseUrl}/users.get?access_token=${accessToken}&v=${this.apiVersion}`;
		const requestParams = {
			url: url,
			body: `user_ids=${userId}&fields=photo_max`
		};
		let data = await request.post(requestParams);
		data = JSON.parse(data);

		if (data.error) {
			console.log(data.error);
		}

		return !data.error ? data.response.length && data.response[0] : null;
	}

	async getWallPosts(accessToken, params) {
		const url = `${this.apiBaseUrl}/wall.get?access_token=${accessToken}&v=${this.apiVersion}`;
		const requestParams = {
			url: url,
			body: `owner_id=${params.ownerId}&count=${params.count || 20}`
		};
		let data = await request.post(requestParams);
		data = JSON.parse(data);

		if (data.error) {
			console.log(data.error);
		}

		return !data.error && data.response ? data.response : null;
	}

	async makeRepost(accessToken, postKey, groupId) {
		const url = `${this.apiBaseUrl}/wall.repost?access_token=${accessToken}&v=${this.apiVersion}`;
		const requestParams = {
			url: url,
			body: `object=${postKey}&group_id=${groupId}`
		};
		let data = await request.post(requestParams);
		data = JSON.parse(data);

		if (data.error) {
			console.log(data.error);
		}

		return !data.error && data.response ? data.response : null;
	}

}

module.exports = VkApi;