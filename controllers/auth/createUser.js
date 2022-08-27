const User = require("../../db/models/User");

module.exports = (req, res) => {
	// Check if user exists

	const { userEmail, userName, userAvatar } = req.body;

	User.findOne({ userEmail }, (err, user) => {
		if (err) res.status(500).json({ message: err });

		// If user exists, return user
		if (user) return res.status(200).json({ message: "User exists", user });

		// If user does not exist, create one
		User.create({
			userName,
			userEmail,
			userAvatar,
			categories: ["Food", "Transport", "Other"],
		})
			.then((user) => {
				return res
					.status(200)
					.json({ message: "User created successfully", user });
			})
			.catch((err) => {
				return res.status(500).json({ message: err });
			});
	});
};
