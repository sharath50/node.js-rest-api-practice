// npm installed modules
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
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

require("dotenv").config({ path: "./config.env" });

// to check whether the jwtPrivateKey env variable is set or not
if (!process.env.JWT_PRIVATE_KEY) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// app configuration middlewares
app.use(logger("dev"));
app.use(express.json());

mongoose
  .connect("mongodb://localhost/Rest_API_Practice", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
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
