var config = {};

config.db = {};

// the URL shortening host - shortened URLs will be this + base58 ID
// ie domain.com/5Ty
config.webhost = 'localhost:3000';

// mongoDB host and database name
config.db.host = 'localhost';
config.db.name = 'purl';

module.exports = config;
