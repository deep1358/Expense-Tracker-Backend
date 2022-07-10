const fakeExpenses = require("./fakeData");
const Expense = require("../db/models/Expense");

class FakeDB {
	// Delete all data from DB
	async clean() {
		await Expense.deleteMany({});
	}
	// Add data to DB
	async addData() {
		await Expense.insertMany(fakeExpenses);
	}
	// Populate DB with fake data
	async populate() {
		await this.clean();
		await this.addData();
	}
}

module.exports = new FakeDB();
