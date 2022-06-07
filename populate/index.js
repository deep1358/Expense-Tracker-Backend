const mongoose = require("mongoose");
const fakeDB = require("./FakeDB");
require("dotenv").config();

mongoose.connect(
	process.env.DB_CONNECTION_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	async (e) => {
		if (e) {
			console.error(e);
		}
		console.log("Starting populating DB");
		await fakeDB.populate();
		await mongoose.connection.close();
		console.log("DB has been populated!");
	}
);
