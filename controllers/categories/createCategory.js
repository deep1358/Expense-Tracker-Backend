const User = require("../../db/models/User");
const categoryExists = require("../../utils/categoryExists");

module.exports = (req, res) => {
	const { categories, userEmail } = req.user;
	const { categoryName } = req.body;

	// Check if category name contains only alphabets
	if (!/^[a-zA-Z]([a-zA-Z _-]*([a-zA-Z]))?$/.test(categoryName.trim()))
		return res.status(400).json({ message: "Category name is invalid" });

	// Check if category exists
	if (categoryExists(categories, categoryName.trim()))
		return res.status(400).json({ message: "Category already exists" });

	// Check if category name is too long
	if (categoryName.trim().length > 20)
		return res
			.status(400)
			.json({ message: "Maximum category name length must be of 20" });
	User.updateOne(
		{ userEmail },
		{ $addToSet: { categories: categoryName.trim() } }
	)
		.then(() => {
			categories.push(categoryName.trim());

			return res.status(200).json({
				message: "Category created successfully",
				categories,
			});
		})
		.catch(() => {
			res.status(500).json({ message: "Error creating category" });
		});
};
