const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
	category: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	note: {
		type: String,
		required: false,
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	month: {
		type: Number,
		required: true,
	},
	day: {
		type: Number,
		required: true,
	},
});

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;
