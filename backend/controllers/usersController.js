const HttpError = require("../models/http-error");

const inicio = (req, res, next) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
  const error = new HttpError("Usted no esta autenticado", 401);
  throw error;
};

const logFailed = (req, res, next) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
};
const cuenta = (req, res, next) => {
  // res.render("account", { user: req.user });
  res.json({ user: req.user });
};
const salir = (req, res, next) => {
  req.logout();
  res.redirect("http://localhost:3000/");
  const error = new HttpError("Error interno", 500);
  throw error;
  //res.redirect("/");
};

exports.inicio = inicio;
exports.salir = salir;
exports.cuenta = cuenta;
exports.logFailed = logFailed;
