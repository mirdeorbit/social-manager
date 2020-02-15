const Client = require('mongodb').MongoClient;
const _ = require('underscore');

const collections = ['schedules', 'users', 'reposts'];

exports.embedders = {};
exports.collections = {};

exports.init = async (params) => {
	console.log(params);
	if (params.config) {
		const db = await Client.connect(params.config.url, params.config.options);

		exports.nativeDb = db;

		// create all collections
		_(collections).each((collectionName) => {
			const module = require(`./${collectionName}`);

			const collection = module.create(db);
			exports.collections[collectionName] = collection;
			exports[collectionName] = exports.collections[collectionName];
		});

		// and init those, which need to be initiated
		_(collections).each((collectionName) => {
			const collection = require(`./${collectionName}`);
			if (collection.init) collection.init();
		});

		return db;
	}

	return params.db;
};
