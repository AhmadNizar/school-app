module.exports=function checkAuth (req, res, next) {
	if (!req.session.isLogin) {
		res.redirect('/login')
		return;
	}
	next();
}