var express = require('express');
var validator = require('express-validator');
var bodyParser = require('body-parser');
module.exports = function(){	
	var app = express();
	app.set('view engine', 'jade');
	app.set('views', './views');
	app.use(express.static('./public'));
	app.use(validator());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	return app;
}
