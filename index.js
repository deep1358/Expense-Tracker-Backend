/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// App initialization
const app = express();

const PORT = process.env.PORT || 5000;

// Database connection
require("./db/index").connect();

// Middlewares
app.use(express.json());

// CORS
app.use(
	cors({
		origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
		methods: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);

// Routes
app.use("/api/auth", require("./routes/auth"));

app.use("/api/category", require("./routes/categories"));

app.use("/api/expense", require("./routes/expenses"));

app.use("/api", (_req, res) => {
	res.send("<h1>Welcome to the Expense Tracker API :)</h1>");
});

// Listen on port
app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);
});
