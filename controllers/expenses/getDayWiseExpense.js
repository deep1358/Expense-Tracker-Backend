const Expense = require("../../db/models/Expense");
const months = require("../../utils/months");

module.exports = (req, res) => {
	const { year, month } = req.params;
	const { _id } = req.user;

	// Get month index
	const monthIndex = months.indexOf(month);

	if (monthIndex === -1)
		return res.status(400).json({ message: "Invalid month" });

	Expense.find(
		{ year, month: monthIndex + 1, user_id: _id },
		{ user_id: 0, __v: 0 }
	)
		.sort({ day: -1 }) // Sort by day in descending order
		.then((expenses) => res.status(200).send(expenses))
		.catch((err) =>
			res
				.status(400)
				.json({ message: err.message || "Error getting day wise data" })
		);
};
