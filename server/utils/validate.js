const conform = require('conform');
const _ = require('underscore');

module.exports = (data, schema, options) => {

	conform.validate(data, schema, _.defaults({}, options, {
		cast: true,
		castSource: true,
		additionalProperties: false,
		applyDefaultValue: true,
		failOnFirstError: true
	}));

	return data;
};
