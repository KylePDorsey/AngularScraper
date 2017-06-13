var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	companyName: {
		type: String,
		require: true
	},
	jobTitle: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	timeStamp: {
		type: Date,
		default: Date.now
	}
});

console.log(ItemSchema);
module.exports = mongoose.model('Item', ItemSchema);