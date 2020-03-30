const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

module.exports = Course = mongoose.model("Course", CourseSchema);

const course = new Course({
  name: "node.js course",
  author: "sharath",
  tags: ["node", "backend", "MEAN"],
  isPublished: true
});
