const User = require("../../db/models/User");

module.exports = (req, res) => {
	// Return user if logged in
	const { userEmail } = req.body;

	User.findOne({ userEmail }, (err, user) => {
		if (err) return res.status(500).json({ message: err });

		// If user exists, return user
		if (user) return res.status(200).json({ message: "User exists", user });
		else return res.status(200).json({ message: "User does not exist" });
	});
};
