const User = require("../../db/models/User");
const categoryExists = require("../../utils/categoryExists");

module.exports = (req, res) => {
	const { categories } = req.user;
	const { categoryName } = req.body;

	// Check if category exists
	if (categoryExists(categories, categoryName))
		return res.status(400).json({ message: "Category already exists" });
	User.updateOne(
		{ userEmail: req.user.userEmail },
		{ $addToSet: { categories: categoryName } }
	)
		.then(() => {
			req.user.categories.push(categoryName);

			return res.status(200).json({
				message: "Category created successfully",
				categories: req.user.categories,
			});
		})
		.catch(() => {
			res.status(500).json({ message: "Error creating category" });
		});
};
