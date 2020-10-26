const express = require("express");

const HttpError = require("../models/http-error");

const authController = require("../controllers/authController");

const usersController = require("../controllers/usersController");
//
var passport = require("passport");

const router = express.Router();

router.get("/login/success", usersController.inicio);

router.get("/login/failed", usersController.logFailed);

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

module.exports = router;
