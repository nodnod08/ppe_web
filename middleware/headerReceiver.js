const headerReceiver = function (req, res, next) {
  //   console.log(req.header("access_point"));
  next();
};

module.exports = headerReceiver;
