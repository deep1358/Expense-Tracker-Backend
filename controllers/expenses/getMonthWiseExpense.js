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
	const { _id } = req.user;
	const { year } = req.params;

	Expense.find({ year }, { month: 1, amount: 1 })
		.then((expenses) => {
			const monthWiseExpense = {};
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
