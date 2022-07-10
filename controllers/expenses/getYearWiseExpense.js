const Expense = require("../../db/models/Expense");

module.exports = (req, res) => {
	const { _id } = req.user;

	Expense.find({ user_id: _id }, { year: 1, amount: 1 })
		.then((expenses) => {
			const yearWiseExpense = {};

			// Group expenses by year
			expenses.forEach((expense) => {
				if (yearWiseExpense[expense.year])
					yearWiseExpense[expense.year] += expense.amount;
				else yearWiseExpense[expense.year] = expense.amount;
			});
			res.status(200).send(yearWiseExpense);
		})
		.catch((err) =>
			res
				.status(400)
				.json({ message: err.message || "Error getting year wise data" })
		);
};
