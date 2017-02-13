// require and initiate express
var express = require('express');
var app = express();

// base 58 - no o or 0 to avoid confusion
var alphabet = "123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ"
var base = alphabet.length;

// using path module to concat our paths
var path = require('path');

// serve files from public dir
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	// set homepage index.html
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function(req, res) {
	// route to create and return a shortened URL
});

app.get('/:encoded_id', function(req, res) {
	// route to redirect the visitor to their original URL
});


// function to convert base 10 integer to base 58 string
function encode(num) {
	var encoded = '';
	while (num) {
		var remainder = num % base;
		num = Math.floor(num / base);
		encoded = alphabet[remainder].toString() + encoded;	    
	}
	return encoded;
}

// functiom to convert base 58 string to base 10 integer
function decode(str) {
	var decoded = 0;
	while (str) {
		var index = alphabet.indexOf(str[0]);
		var power = str.length - 1;
		decoded += index * (Math.pow(base, power));
		str = str.substring(1);
	}
	return decoded;
}


module.exports.encode = encode;
module.exports.decode = decode;

var server = app.listen(3000, function() {
	console.log('Server is running on port 3000');
});



