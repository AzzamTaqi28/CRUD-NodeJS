const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const BlogPostSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Please provide a title'],
	},
	body: {
		type: String,
		required: [true, 'Please provide a body'],
	},
	// username: String
	userid:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	datePosted: {
		type: Date,
		default: new Date(),
	},
	image: String,
});
BlogPostSchema.plugin(uniqueValidator);

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
