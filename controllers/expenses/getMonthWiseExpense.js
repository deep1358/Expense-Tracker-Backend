const Expense = require("../../db/models/Expense");
const months = require("../../utils/months");

module.exports = (req, res) => {
	const { year } = req.params;
	const { _id } = req.user;

	Expense.find({ year, user_id: _id }, { month: 1, amount: 1 })
		.sort({
			month: 1,
		})
		.then((expenses) => {
			const monthWiseExpense = {};

			// Group expenses by month
			expenses.forEach((expense) => {
				if (monthWiseExpense[months[expense.month - 1]])
					monthWiseExpense[months[expense.month - 1]] += expense.amount;
				else monthWiseExpense[months[expense.month - 1]] = expense.amount;
			});

			res.status(200).send(monthWiseExpense);
		})
		.catch((err) =>
			res
				.status(400)
				.json({ message: err.message || "Error getting month wise data" })
		);
};
