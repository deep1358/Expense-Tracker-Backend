const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

const duplicateCode = (categories, expense, res) => {
	let data = [],
		map = new Map();

	categories.forEach((category) => {
		map.set(category, 0);
	});

	expense.forEach((el) => {
		map.set(el.category, map.get(el.category) + el.amount);
	});
	data = Array.from(map, ([category, amount]) => ({
		category,
		amount,
	}));
	res.status(200).send(data);
};

module.exports = (req, res) => {
	const { _id, categories } = req.user;
	const { year, month } = req.query;
	User.findById(_id)
		.then((userRes) => {
			if (userRes) {
				if (year === "All" && month === "All") {
					Expense.find({ user_id: _id }, { category: 1, amount: 1 })
						.then((expense) => {
							duplicateCode(categories, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else {
					if (year === "All") {
						Expense.find(
							{ user_id: _id, month: month },
							{ category: 1, amount: 1 }
						)
							.then((expense) => {
								duplicateCode(categories, expense, res);
							})
							.catch((err) =>
								res
									.status(400)
									.json({ message: err.message || "Error" })
							);
					} else if (month === "All") {
						Expense.find(
							{ user_id: _id, year: year },
							{ category: 1, amount: 1 }
						)
							.then((expense) => {
								duplicateCode(categories, expense, res);
							})
							.catch((err) =>
								res
									.status(400)
									.json({ message: err.message || "Error" })
							);
					} else {
						Expense.find(
							{ user_id: _id, year: year, month: month },
							{ category: 1, amount: 1 }
						)
							.then((expense) => {
								duplicateCode(categories, expense, res);
							})
							.catch((err) =>
								res
									.status(400)
									.json({ message: err.message || "Error" })
							);
					}
				}
			} else res.status(404).json({ message: "User not found" });
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
};
