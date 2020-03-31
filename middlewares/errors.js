module.exports = {
  // catch 404 and forward to error handler
  NoPageError: function(req, res, next) {
    return res.status(404).send({ msg: "404 : page not found" });
  },
  // 500 error handler
  ServerError: function(err, req, res, next) {
    return res
      .status(err.status || 500)
      .send({ msg: "500 : server not responding" });
  }
};
