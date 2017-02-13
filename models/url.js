var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the counters schema with an _id field and a seq field
var CounterSchema = Schema ({
	_id: { type: String, required: true},
	seq: { type: Number, default: 0 }
});

// create a model from that schema
var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
	_id: { type: Number, index: true },
	long_url: String,
	created_at: Date
});

// Middleware to execute the callback function
// every time before an entry is saved to the urls collection
urlSchema.pre('save', function(next){
	var doc = this; 
	// find the url_count and increment by 1
	counter.findByIdAndUpdate({
});
