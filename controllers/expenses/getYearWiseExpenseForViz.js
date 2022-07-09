const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

const duplicateCode = (expense, res, years, category = "") => {
	let data = [],
		map = new Map();

	years.sort((a, b) => a - b);

	years.forEach((year) => {
		map.set(year, 0);
	});

	let filteredExpense = expense;

	if (category !== "")
		filteredExpense = expense.filter((exp) => exp.category === category);

	filteredExpense.forEach((el) => {
		map.set(el.year, map.get(el.year) + el.amount);
	});

	data = Array.from(map, ([year, amount]) => ({
		year,
		amount,
	}));
	res.status(200).send(data);
};

module.exports = (req, res) => {
	const { _id } = req.user;
	const { category, month, day } = req.query;
	User.findById(_id)
		.then((userRes) => {
			if (userRes) {
				// Get all unique years from the database
				Expense.find({ user_id: _id }, { year: 1, _id: 0 })
					.then((expenses) => {
						if (expenses.length > 0) {
							let years = [...new Set(expenses.map((exp) => exp.year))];
							if (
								category === "All" &&
								month === "All" &&
								day === "All"
							) {
								Expense.find({ user_id: _id }, { year: 1, amount: 1 })
									.then((expense) => {
										duplicateCode(expense, res, years);
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
										duplicateCode(expense, res, years);
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
										duplicateCode(expense, res, years);
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
										duplicateCode(expense, res, years, category);
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
										duplicateCode(expense, res, years, category);
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
										duplicateCode(expense, res, years, category);
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
										duplicateCode(expense, res, years);
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
										duplicateCode(expense, res, years, category);
									})
									.catch((err) =>
										res
											.status(400)
											.json({ message: err.message || "Error" })
									);
							}
						} else {
							res.status(400).json({ message: "No Expenses found!" });
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
