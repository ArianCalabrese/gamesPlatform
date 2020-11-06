const express = require("express");
const cors = require("cors");
const authController = require("../controllers/authController");

const usersController = require("../controllers/usersController");

const SteamStrategy = require("passport-steam");

var session = require("express-session");

var passport = require("passport");

let user = {};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new SteamStrategy(
    {
      returnURL:
        "https://southamerica-east1-atiweb.cloudfunctions.net/getServers/api/users/steam/return",
      realm: "https://southamerica-east1-atiweb.cloudfunctions.net/getServers/",
      apiKey: "2BF27FFE923985429974F41F1E98B3B8",
    },

    async (identifier, profile, done) => {
      profile.identifier = identifier;
      user = { ...profile };
      return done(null, profile);
    }
  )
);

const app = express();

app.use(
  session({
    secret: "your secret",
    name: "name of session id",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());

app.use(passport.initialize());

//app.use(passport.session()); //ACA HAY UN PROBLEMON

app.get("/login/success", (req, res, next) => {
  res.send(user);
});

app.get("/login/failed", usersController.logFailed);

app.get("/logout", (req, res) => {
  console.log("logging out!");
  req.logout();
  user = {};
  res.redirect("https://atiweb.firebaseapp.com");
});

app.get("/steam", passport.authenticate("steam"), authController.steam);

app.get(
  "/steam/return",
  function (req, res, next) {
    req.url = req.originalUrl;
    next();
  },
  passport.authenticate("steam"),
  authController.steamReturn
);

module.exports = app;
