const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

const ModifyResponse = (categories, expense, res) => {
	let data = [],
		map = new Map(); // Map to store unique category and amount

	// Set map with unique category to amount 0 initially
	categories.forEach((category) => {
		map.set(category, 0);
	});

	// Add amount to unique category
	expense.forEach((el) => {
		map.set(el.category, map.get(el.category) + el.amount);
	});

	// Convert map to array
	data = Array.from(map, ([category, amount]) => ({
		category,
		amount,
	}));
	res.status(200).send(data);
};

module.exports = (req, res) => {
	const { user_id } = req.headers;
	const { year, month, day } = req.query;

	// Check if user exists
	User.findById(user_id, { categories: 1 })
		.then((userRes) => {
			if (userRes) {
				let { categories } = userRes;
				if (year === "All" && month === "All" && day === "All") {
					Expense.find({ user_id }, { category: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(categories, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (year === "All" && month === "All") {
					Expense.find({ user_id, day }, { category: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(categories, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (month === "All" && day === "All") {
					Expense.find({ user_id, year }, { category: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(categories, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (year === "All" && day === "All") {
					Expense.find({ user_id, month }, { category: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(categories, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (day === "All") {
					Expense.find(
						{ user_id, year, month },
						{ category: 1, amount: 1 }
					)
						.then((expense) => {
							ModifyResponse(categories, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (year === "All") {
					Expense.find({ user_id, month, day }, { category: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(categories, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (month === "All") {
					Expense.find({ user_id, year, day }, { category: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(categories, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else {
					Expense.find(
						{ user_id, year, month, day },
						{ category: 1, amount: 1 }
					)
						.then((expense) => {
							ModifyResponse(categories, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				}
			} else res.status(404).json({ message: "User not found" });
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
};
