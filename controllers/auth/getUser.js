module.exports = (req, res) => {
	// console.log(req.session, req.user);
	if (req.user) {
		return res
			.status(200)
			.json({ message: "User logged in", user: req.user });
	}
	return res.status(200).json({ message: "User not logged in" });
};
