const Expense = require("../../db/models/Expense");

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

module.exports = (req, res) => {
	const { year, month } = req.params;

	const monthIndex = months.indexOf(month);

	if (monthIndex === -1)
		return res.status(400).json({ message: "Invalid month" });

	Expense.find({ year, month: monthIndex + 1 }, { user_id: 0, __v: 0 })
		.sort({ createdAt: -1 })
		.then((expenses) => res.status(200).send(expenses))
		.catch((err) =>
			res
				.status(400)
				.json({ message: err.message || "Error getting day wise data" })
		);
};
