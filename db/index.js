const mongoose = require("mongoose");
require("./models/User");
require("./models/Expense");

exports.connect = () => {
	// Connection to Mongo DB
	return mongoose.connect(
		process.env.DB_CONNECTION_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(err) => {
			if (err) {
				console.error(err);
			}
			console.log("Connected to DB");
		}
	);
};
