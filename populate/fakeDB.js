const fakeExpenses = require("./fakeData");
const Expense = require("../db/models/Expense");

class FakeDB {
	async clean() {
		await Expense.deleteMany({});
	}
	async addData() {
		await Expense.insertMany(fakeExpenses);
	}
	async populate() {
		await this.clean();
		await this.addData();
	}
}

module.exports = new FakeDB();
