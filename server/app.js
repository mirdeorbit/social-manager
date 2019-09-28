var express = require('express');
var cors = require('cors');
var app = express();

var corsOptions = {
	origin: 'http://127.0.0.1:3000',
	optionsSuccessStatus: 200
};

app.post('/api/auth/signin', cors(corsOptions), function (req, res, next) {
	res.json({msg: 'This is CORS-enabled for only example.com.'})
});

app.listen(3002, function () {
	console.log('CORS-enabled web server listening on port 3002')
});