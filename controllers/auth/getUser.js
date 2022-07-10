module.exports = (req, res) => {
	// Return user if logged in
	if (req.user)
		return res
			.status(200)
			.json({ message: "User logged in", user: req.user });

	return res.status(200).json({ message: "User not logged in" });
};
