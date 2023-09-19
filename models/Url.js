const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
	shortId: {
		type: String,
		required: true,
		unique: true
	},
	redirectedUrl: {
		type: String,
		required: true
	},
	password: {
		type: String,
		default: null
	}
});

const URL = mongoose.model('url', urlSchema);

module.exports = URL;
