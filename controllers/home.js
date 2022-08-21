const BlogPost = require('../models/BlogPost');

module.exports = module.exports = async (req, res) => {
	const blogposts = await BlogPost.find({}).populate('userid');
	console.log(req.session.userId);
	res.render('index', {
		blogposts,
	});
}
