const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const getMonthWiseDays = require("../../utils/getMonthWiseDays");

const ModifyResponse = (month, year, expense, res) => {
	let data = [],
		map = new Map(); // Map to store day and amount

	// Set map with day to amount 0 initially
	getMonthWiseDays(month, year).forEach((day) => {
		map.set(day, 0);
	});

	// Add amount to day
	expense.forEach((el) => {
		map.set(el.day, map.get(el.day) + el.amount);
	});

	// Convert map to array
	data = Array.from(map, ([day, amount]) => ({
		// day with shorter month name
		day: `${day} ${new Date(year, month - 1, day).toLocaleDateString(
			"en-US",
			{
				month: "short",
			}
		)}`,

		amount,
	}));
	res.status(200).send(data);
};

module.exports = (req, res) => {
	const { _id } = req.user;
	const { year, month, category } = req.query;

	// Check if user exists
	User.findById(_id)
		.then((userRes) => {
			if (userRes) {
				if (month === "All" || year === "All") {
					return res.status(400).json({
						message:
							"Please select a month and year for Day wise expense chart",
					});
				} else if (category === "All") {
					Expense.find(
						{ user_id: _id, year, month },
						{ day: 1, amount: 1 }
					)
						.then((expense) => {
							ModifyResponse(month, year, expense, res);
						})
						.catch((err) =>
							res.status(400).json({ message: err.message || "Error" })
						);
				} else {
					Expense.find(
						{ user_id: _id, year, month, category },
						{ day: 1, amount: 1 }
					)
						.then((expense) => {
							ModifyResponse(month, year, expense, res);
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
