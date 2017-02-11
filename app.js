// require and initiate express
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	// route to serve up the homepage (index.html)
});

app.post('/api/shorten', function(req, res) {
	// route to create and return a shortened URL
});

app.get('/:encoded_id', function(req, res) {
	// route to redirect the visitor to their original URL
});

var server = app.listen(3000, function() {
	console.log('Server is running on port 3000');
});



