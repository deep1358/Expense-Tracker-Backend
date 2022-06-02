const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

// App initialization

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares

app.use(express.json());

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 15,
		},
	})
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use("/api/auth", require("./routes/auth"));

app.use("/", (req, res) => {
	res.send("<h1>Welcome to the Expense Tracker API :)</h1>");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
