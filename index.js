/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
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
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);

// Session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: !process.env.NODE_ENV === "production",
		saveUninitialized: !process.env.NODE_ENV === "production",
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 15,
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			secure: process.env.NODE_ENV === "production",
		},
	})
);

if (app.get("env") === "production") {
	app.set("trust proxy", 1); //necessary to set up a cookie in production
}

// Passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

// Routes
app.use("/auth", require("./routes/auth"));

app.use("/category", require("./routes/categories"));

app.use("/expense", require("./routes/expenses"));

app.use("/", (_req, res) => {
	res.send("<h1>Welcome to the Expense Tracker API :)</h1>");
});

// Listen on port
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
