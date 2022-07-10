const User = require("../../db/models/User");

module.exports = (req, res) => {
	User.updateOne(
		{ userEmail: req.user.userEmail },
		{ $addToSet: { categories: req.body.categoryName } }
	)
		.then(() => {
			// Add only unique categories to the user's session
			req.user.categories = [
				...new Set([...req.user.categories, req.body.categoryName]),
			];

			return res.status(200).json({
				message: "Category created successfully",
				categories: req.user.categories,
			});
		})
		.catch(() => {
			res.status(500).json({ message: "Error creating category" });
		});
};
