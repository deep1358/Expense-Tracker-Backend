const Expense = require("../../db/models/Expense");
const months = require("../../utils/months");

module.exports = (req, res) => {
	const { year } = req.params;

	Expense.find({ year }, { month: 1, amount: 1 })
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
