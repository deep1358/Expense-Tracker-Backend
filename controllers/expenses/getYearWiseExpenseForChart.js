const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

const ModifyResponse = (expense, res, years, category = "") => {
	let data = [],
		map = new Map(); // Map to store year and amount

	// Sort years in descending order
	years.sort((a, b) => a - b);

	// Set map with year to amount 0 initially
	years.forEach((year) => {
		map.set(year, 0);
	});

	let filteredExpense = expense;

	// Filter expense by category if category is specified
	if (category !== "")
		filteredExpense = expense.filter((exp) => exp.category === category);

	// Add amount to year
	filteredExpense.forEach((el) => {
		map.set(el.year, map.get(el.year) + el.amount);
	});

	// Convert map to array
	data = Array.from(map, ([year, amount]) => ({
		year,
		amount,
	}));
	res.status(200).json(data);
};

module.exports = (req, res) => {
	const { _id } = req.user;
	const { category, month, day } = req.query;

	// Check if user exists
	User.findById(_id)
		.then((userRes) => {
			if (userRes) {
				Expense.find({ user_id: _id }, { year: 1, _id: 0 })
					.then((expenses) => {
						if (expenses.length > 0) {
							// Get all unique years from the database
							let years = [...new Set(expenses.map((exp) => exp.year))];

							if (
								category === "All" &&
								month === "All" &&
								day === "All"
							) {
								Expense.find({ user_id: _id }, { year: 1, amount: 1 })
									.then((expense) => {
										ModifyResponse(expense, res, years);
									})
									.catch((err) =>
										res
											.status(400)
											.json({ message: err.message || "Error" })
									);
							} else if (category === "All" && month === "All") {
								Expense.find(
									{ user_id: _id, day },
									{ year: 1, amount: 1 }
								)
									.then((expense) => {
										ModifyResponse(expense, res, years);
									})
									.catch((err) =>
										res
											.status(400)
											.json({ message: err.message || "Error" })
									);
							} else if (category === "All" && day === "All") {
								Expense.find(
									{ user_id: _id, month },
									{ year: 1, amount: 1 }
								)
									.then((expense) => {
										ModifyResponse(expense, res, years);
									})
									.catch((err) =>
										res
											.status(400)
											.json({ message: err.message || "Error" })
									);
							} else if (month === "All" && day === "All") {
								Expense.find(
									{ user_id: _id, category },
									{ year: 1, amount: 1, category: 1 }
								)
									.then((expense) => {
										ModifyResponse(expense, res, years, category);
									})
									.catch((err) =>
										res
											.status(400)
											.json({ message: err.message || "Error" })
									);
							} else if (month === "All") {
								Expense.find(
									{ user_id: _id, category, day },
									{ year: 1, amount: 1, category: 1 }
								)
									.then((expense) => {
										ModifyResponse(expense, res, years, category);
									})
									.catch((err) =>
										res
											.status(400)
											.json({ message: err.message || "Error" })
									);
							} else if (day === "All") {
								Expense.find(
									{ user_id: _id, category, month },
									{ year: 1, amount: 1, category: 1 }
								)
									.then((expense) => {
										ModifyResponse(expense, res, years, category);
									})
									.catch((err) =>
										res
											.status(400)
											.json({ message: err.message || "Error" })
									);
							} else if (category === "All") {
								Expense.find(
									{ user_id: _id, month, day },
									{ year: 1, amount: 1 }
								)
									.then((expense) => {
										ModifyResponse(expense, res, years);
									})
									.catch((err) =>
										res
											.status(400)
											.json({ message: err.message || "Error" })
									);
							} else {
								Expense.find(
									{ user_id: _id, category, month, day },
									{ year: 1, amount: 1, category: 1 }
								)
									.then((expense) => {
										ModifyResponse(expense, res, years, category);
									})
									.catch((err) =>
										res
											.status(400)
											.json({ message: err.message || "Error" })
									);
							}
						} else {
							res.status(200).send([]);
						}
					})
					.catch((err) =>
						res.status(400).json({ message: err.message || "Error" })
					);
			} else res.status(404).json({ message: "User not found" });
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
};
