var express = require('express');
var path = require('path');
var routes = require('./routes');

var port = 8080;

var app = express();


app.use('/api', routes);

app.listen(port, function() {
	console.log('running server on port ' + port);
})
