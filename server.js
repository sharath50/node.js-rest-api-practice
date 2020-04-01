// npm installed modules
require("express-async-errors"); // this will automatically catches the errors asynchronously
var logger = require("morgan");
const express = require("express");
const app = express();

// app configuration middlewares
app.use(logger("dev"));
app.use(express.json());

// prior configurations
require("dotenv").config({ path: "./config.env" });
require("./config/logger").uncaughtExceptionHandler();
require("./config/mongoConnect");
const { InfoLogger } = require("./config/logger");
require("./config/validation");

// to check whether the jwtPrivateKey env variable is set or not
if (!process.env.JWT_PRIVATE_KEY) {
  throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
}

require("./config/routes")(app);

// use joi password complexity to implement passoword complexity
// npm i joi-password-complexity

// app running on this port
const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => {
  console.log(`App Listening on localhost:${port}...`);
});
