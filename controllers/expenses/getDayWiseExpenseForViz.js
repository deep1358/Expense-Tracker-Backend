const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

const duplicateCode = (month, year, expense, res) => {
	let data = [],
		map = new Map();

	getMonthWiseDays(month, year).forEach((day) => {
		map.set(day, 0);
	});

	expense.forEach((el) => {
		map.set(el.day, map.get(el.day) + el.amount);
	});
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

const daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const getMonthWiseDays = (month, year) => {
	let days = [],
		daysInMonth = daysOfMonths[month - 1];
	if (leapYear(year) && month === "2") daysInMonth = 29;
	for (let i = 1; i <= daysInMonth; i++) days.push(i);
	return days;
};

function leapYear(year) {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

module.exports = (req, res) => {
	const { _id } = req.user;
	const { year, month, category } = req.query;
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
							duplicateCode(month, year, expense, res);
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
							duplicateCode(month, year, expense, res);
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
