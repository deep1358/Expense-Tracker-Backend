module.exports = function (req, res, next) {
	req.logout((err) => {
		if (err) return next(err);

		// Destroy session
		res.clearCookie("connect.sid");
		req.session.destroy((err) => {
			if (err) return next(err);
			return res.status(200).json({ message: "Logged out" });
		});
	});
};
