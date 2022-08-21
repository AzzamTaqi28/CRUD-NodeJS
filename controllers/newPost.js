module.exports = (req, res) => {
	if (req.session.userId) {
		var title = "";
		var body = "";
		var files = "";
		const data = req.flash('data')[0];
		if (typeof data !== 'undefined') {
			title = data.title;
			body = data.body;
			files = data.image;
		}
		return res.render('create',{
			errors: req.flash('blogValidationErr'),
			title: title,
			body: body,
			image: files,
			createPost: true
		});
	}
	res.redirect('/auth/login');
};
