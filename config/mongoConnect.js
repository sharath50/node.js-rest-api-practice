const mongoose = require("mongoose");
const { InfoLogger } = require("../config/logger");

mongoose
  .connect(process.env.DB_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    //InfoLogger.info("Connected to MongoDB") // activate this for production
    console.log("Connected to MongoDB");
  });

module.exports = mongoose;
