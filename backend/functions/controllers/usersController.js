const HttpError = require("../models/http-error");

const inicio = (req, res, next) => {
  res.send(req.user);
};

const logFailed = (req, res, next) => {
  const error = new HttpError(
    {
      success: false,
      message: "user failed to authenticate.",
    },
    401
  );
  throw error;
};

const salir = (req, res, next) => {
  req.user = {};
  res.redirect("https://atiweb.firebaseapp.com/");
};

exports.inicio = inicio;
exports.salir = salir;
exports.logFailed = logFailed;
