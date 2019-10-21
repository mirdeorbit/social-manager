const _ = require('underscore');
const paths = ['socials'];

_(paths).each(function (path) {
	const helpers = require('./' + path);
	exports[path] = helpers;
});
