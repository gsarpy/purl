// require and initiate express
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
// import base 58 algorithm to encode/decode url
var base58 = require('./base58');

// Import Url model
var Url = require('./models/url');

// connect to mongodb
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true } ));

// serve files from public dir
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	// set homepage index.html
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function(req, res){
	// route to create and return a shortened URL
	var longUrl = req.body.url;
	var shortUrl = '';

	// check if url exists already
	Url.findOne({long_url: longUrl}, function(err, doc){
		if (doc) {
			// url is already in db
			shortURL = config.webhost + base58.encode(doc._id);

			// because doc exists in db we will just return 
			// it without creating a new entry
			res.send({'shortUrl': shortUrl});
		} else {
			// long url not in db so create new entry
			var newUrl = Url({
				long_url: longUrl
			});

			// save new link
			newUrl.save(function(err){
				if (err) {
					alert(err);
				}

				// create short url
				shortUrl = config.webhost + base58.encode(newUrl._id);

				res.send({'shortUrl': shortUrl});
			});
		}
	});

});

app.get('/:encoded_id', function(req, res) {
	// route to redirect the visitor to their original URL
	var base58Id = req.params.encoded_id;
	var id = base58.decode(base58Id);

	// check if url already in the database
	Url.findOne({_id: id}, function(err, doc){
		if (doc) {
			// if entry is found in db redirect 
			// the user to their destination
			res.redirect(doc.long_url);
		} else {
			// if nothing found send them home
			res.redirect(config.webhost);
		}
	});
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
		var power = str.length - 2;
		decoded += index * (Math.pow(base, power));
		str = str.substring(1);
	}
	return decoded;
}


module.exports.encode = encode;
module.exports.decode = decode;

var server = app.listen(3000, function() {
	console.log('All systems operational. Server link initiated on port 3000.');
});
