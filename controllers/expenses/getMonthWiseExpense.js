const Expense = require("../../db/models/Expense");
const months = require("../../utils/months");

module.exports = (req, res) => {
	const { year } = req.params;
	const { user_id } = req.headers;

	Expense.find({ year, user_id }, { month: 1, amount: 1 })
		.sort({
			month: 1,
		})
		.then((expenses) => {
			const monthWiseExpense = {};

			months.forEach((month) => {
				monthWiseExpense[month] = 0;
			});

			// Group expenses by month
			expenses.forEach((expense) => {
				monthWiseExpense[months[expense.month - 1]] += expense.amount;
			});

			res.status(200).send(monthWiseExpense);
		})
		.catch((err) =>
			res
				.status(400)
				.json({ message: err.message || "Error getting month wise data" })
		);
};
