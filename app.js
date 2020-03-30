//
var express = require("express");
var app = express();
var path = require("path");
var logger = require("morgan");
var mongoose = require("./config/mongoConnection");

//
var root = require("./routes");

app.use(logger("dev"));
app.use(express.json());

app.use("/", root());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new Error("404 pag not found"));
});

// 500 error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.send(`${err.status || 500} error`);
});

require("./model/courses");

module.exports = app;
