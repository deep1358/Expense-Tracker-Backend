const User = require("../../db/models/User");

module.exports = (req, res) => {
	User.updateOne(
		{ userEmail: req.user.userEmail },
		{ $addToSet: { categories: req.body.categoryName } }
	)
		.then(() => {
			res.status(200).json({ message: "Category created successfully" });
		})
		.catch((err) => {
			res.status(500).json({ message: "Error creating category" });
		});
};
