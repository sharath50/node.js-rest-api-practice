const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/MongoPractice", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

module.exports = mongoose;
