const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const months = require("../../utils/months");

const ModifyResponse = (expense, res) => {
	let data = [],
		map = new Map(); // Map to store month and amount

	// Set map with month to amount 0 initially
	months.forEach((_, index) => {
		map.set(index + 1, 0);
	});

	// Add amount to month
	expense.forEach((el) => {
		map.set(el.month, map.get(el.month) + el.amount);
	});

	// Convert map to array
	data = Array.from(map, ([month, amount]) => ({
		month: months[month - 1],
		amount,
	}));
	res.status(200).json(data);
};

module.exports = (req, res) => {
	const { _id } = req.user;
	const { year, category, day } = req.query;

	// Check if user exists
	User.findById(_id)
		.then((userRes) => {
			if (userRes) {
				if (year === "All" && category === "All" && day === "All") {
					Expense.find({ user_id: _id }, { month: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (year === "All" && category === "All") {
					Expense.find({ user_id: _id, day }, { month: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (year === "All" && day === "All") {
					Expense.find({ user_id: _id, category }, { month: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (category === "All" && day === "All") {
					Expense.find({ user_id: _id, year }, { month: 1, amount: 1 })
						.then((expense) => {
							ModifyResponse(expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (day === "All") {
					Expense.find(
						{ user_id: _id, year, category },
						{ month: 1, amount: 1 }
					)
						.then((expense) => {
							ModifyResponse(expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (category === "All") {
					Expense.find(
						{ user_id: _id, year, day },
						{ month: 1, amount: 1 }
					)
						.then((expense) => {
							ModifyResponse(expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else if (year === "All") {
					Expense.find(
						{ user_id: _id, category, day },
						{ month: 1, amount: 1 }
					)
						.then((expense) => {
							ModifyResponse(expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else {
					Expense.find(
						{ user_id: _id, year, category, day },
						{ month: 1, amount: 1 }
					)
						.then((expense) => {
							ModifyResponse(expense, res);
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
