const { default: mongoose } = require("mongoose");

module.exports = (req, res, next) => {
	try {
		const { user_id } = req.headers;

		// Check if valid mongodb object id
		if (!mongoose.Types.ObjectId.isValid(user_id))
			return res.status(401).json({ message: "Invalid ID" });
		// Check if user is logged in
		if (user_id) return next();
		return res.status(401).json({ message: "Unauthenticated User" });
	} catch (err) {
		return res.status(err?.statusCode || 500).json({ error: err });
	}
};
