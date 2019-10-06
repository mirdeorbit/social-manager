'use strict';

const express = require('express');
const _ = require('underscore');

const router = express.Router({mergeParams: true});

exports.router = router;

const routes = [
	'auth', 'schedules', 'users'
];

_(routes).each((name) => {
	const resource = require('./' + name);
	const path = resource.path || '/' + name;
	router.use(path, resource.router);
});