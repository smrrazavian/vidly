// --------------------- Imports ---------------------
const helmet = require("helmet");
const genres = require("./routers/genres");
const home = require("./routers/home");
const morgan = require("morgan");
const express = require("express");
require("dotenv").config();

// --------------------- Initializing ---------------------
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TODO: Check if this is needed and what it does?
app.use(helmet());
app.use(morgan("tiny"));
app.use("/api/genres", genres);
app.use("/", home);

// --------------------- SETTING PORT ---------------------
const PORT = process.env.PORT || 3000;
console.log(`Listening on port ${PORT}...`);
app.listen(PORT);
