// npm installed modules
require("express-async-errors"); // this will automatically catches the errors asynchronously
const { InfoLogger } = require("./config/logger");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
var logger = require("morgan");
const express = require("express");
const app = express();

// internal dependacies
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

// configurations
require("./config/mongoConnect");
require("./config/logger");

// to check whether the jwtPrivateKey env variable is set or not
if (!process.env.JWT_PRIVATE_KEY) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// app configuration middlewares
app.use(logger("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  // InfoLogger.info("hit / route");
  // throw new Error("intentinally throwing error");
  res.send({
    API: [
      "/api/genres",
      "/api/customers",
      "/api/movies",
      "/api/rentals",
      "/api/users",
      "/api/auth"
    ]
  });
});

// router middlewares
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

// use joi password complexity to implement passoword complexity
// npm i joi-password-complexity

app.use(require("./middlewares/errors").NoPageError);
app.use(require("./middlewares/errors").ServerError);

module.exports = app;
