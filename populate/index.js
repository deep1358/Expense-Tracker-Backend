const mongoose = require("mongoose");
const fakeDB = require("./FakeDB");
require("dotenv").config();

// Connect to Mongo DB
mongoose.connect(
	process.env.DB_CONNECTION_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	async (e) => {
		if (e) console.error(e);
		// Populate DB with fake data
		console.log("Starting populating DB");
		await fakeDB.populate();
		await mongoose.connection.close();
		console.log("DB has been populated!");
	}
);
