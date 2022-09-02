const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Expense
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
	payment_mode: {
		type: String,
		required: true,
		default: "Cash",
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
