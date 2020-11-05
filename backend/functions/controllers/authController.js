const steam = (req, res, next) => {
  req.url = req.originalUrl;
  console.log("return");
  next();
};
const steamReturn = (req, res, next) => {
  res.redirect("https://atiweb.firebaseapp.com");
};

exports.steam = steam;
exports.steamReturn = steamReturn;
