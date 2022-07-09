module.exports = (req, res, next) => {
	try {
		if (req.user) {
			return next();
		}
		return res.status(401).json({ message: "Unauthenticated User" });
	} catch (err) {
		return res.status(err?.statusCode || 500).json({ error: err });
	}
};
