const User = require("../../db/models/User");
const categoryExists = require("../../utils/categoryExists");

module.exports = (req, res) => {
	const { categories, userEmail } = req.user;
	const { categoryName } = req.body;

	// Check if category exists
	if (categoryExists(categories, categoryName))
		return res.status(400).json({ message: "Category already exists" });

	// Check if category name is too long
	if (categoryName.length > 20)
		return res
			.status(400)
			.json({ message: "Maximum category name length must be of 20" });
	User.updateOne({ userEmail }, { $addToSet: { categories: categoryName } })
		.then(() => {
			categories.push(categoryName);

			return res.status(200).json({
				message: "Category created successfully",
				categories,
			});
		})
		.catch(() => {
			res.status(500).json({ message: "Error creating category" });
		});
};
