module.exports = function(app) {
  // internal dependacies
  const genres = require("../routes/genres");
  const customers = require("../routes/customers");
  const movies = require("../routes/movies");
  const rentals = require("../routes/rentals");
  const users = require("../routes/users");
  const auth = require("../routes/auth");

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

  app.use(require("../middlewares/errors").NoPageError);
  app.use(require("../middlewares/errors").ServerError);
};
