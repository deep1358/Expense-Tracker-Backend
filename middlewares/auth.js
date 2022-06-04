module.exports = (req, res, next) => {
	// console.log(req.user);
	try {
		if (req.user) {
			return next();
		}
		return res.status(401).json({ error: "Unauthenticated User" });
	} catch (err) {
		return res.status(err?.statusCode || 500).json({ error: err });
	}
};
