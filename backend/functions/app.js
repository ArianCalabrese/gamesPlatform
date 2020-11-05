const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const serverRoutes = require("./routes/servers-router");
const userRoutes = require("./routes/users-router");
var passport = require("passport");

const functions = require("firebase-functions");
const SteamStrategy = require("passport-steam");

session = require("express-session");

const cookieSession = require("cookie-session");

const keys = require("./config/keys");
const cookieParser = require("cookie-parser");

const admin = require("firebase-admin");

const app = express();

// app.use(
//   cookieSession({
//     name: "session",
//     keys: [keys.COOKIE_KEY],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());


// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//

// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/servers", serverRoutes);

app.use("/api/users", userRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

exports.getServers = functions
  .region("southamerica-east1")
  .https.onRequest(app);
