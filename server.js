const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { errHandler } = require("./server/middleware/middleware");
const connectDB = require("./server/database/db");

// Init app
const app = express();

// mongodb connection
connectDB();

// log requests
app.use(morgan("tiny"));

// parse request to body-parser
app.use(express.urlencoded({ extended: true }));

// Set Route
app.use("/", require("./server/routes/routes"));

// Set view engine
app.set("view engine", "ejs");

// load assets
app.use(express.static(path.join(__dirname, "./assets")));

// middleware errorHandler
app.use(errHandler);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost${PORT}`.underline)
);
