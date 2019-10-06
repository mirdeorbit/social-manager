const express = require('express');
const _ = require('underscore');

const router = express.Router({mergeParams: true});

exports.router = router;

const routes = [
	'signin'
];

_(routes).each((name) => {
	require('./' + name)(router);
});
