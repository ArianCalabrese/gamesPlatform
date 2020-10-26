const express = require("express");
const { check } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const authController = require("../controllers/authController");

const usersController = require("../controllers/usersController");
//
var passport = require("passport"),
  util = require("util"),
  SteamStrategy = require("../lib/").Strategy,
  session = require("express-session");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//let usuario;

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5000/api/users/steam/return",
      realm: "http://localhost:5000/api/users/",
      apiKey: "2BF27FFE923985429974F41F1E98B3B8",
    },
    function (identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        console.log(profile);
        profile.identifier = identifier;

        //usuario = profile;

        return done(null, profile);
      });
    }
  )
);
//
const router = express.Router();

router.get("/login/success", usersController.inicio);

router.get("/login/failed", usersController.logFailed);

router.get("/account", ensureAuthenticated, usersController.cuenta);

router.get("/logout", usersController.salir);

router.get(
  "/steam",
  passport.authenticate("steam", { failureRedirect: "/" }),
  authController.steam
);

router.get(
  "/steam/return",
  function (req, res, next) {
    req.url = req.originalUrl;
    console.log("return");
    next();
  },
  passport.authenticate("steam", {
    failureRedirect: "/",
    successRedirect: "http://localhost:3000/",
  }),
  authController.steamReturn
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log(req.isAuthenticated());
  //console.log(usuario);
  const error = new HttpError("Usted no esta autenticado", 401);
  throw error;
  //res.redirect("/");
}
module.exports = router;
