const steam = (req, res, next) => {
  req.url = req.originalUrl;
  console.log("return");
  next();
};
const steamReturn = (req, res, next) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  //res.json({ msg: "Logueado con exito!"});
};

exports.steam = steam;
exports.steamReturn = steamReturn;
