const express = require('express');
const _ = require('underscore');

const router = express.Router({mergeParams: true});

exports.router = router;

const routes = [
	'create', 'get', 'getOne', 'patch'
];

_(routes).each((name) => {
	require('./' + name)(router);
});
