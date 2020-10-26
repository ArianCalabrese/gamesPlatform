const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const serverRoutes = require("./routes/servers-router");

const userRoutes = require("./routes/users-router");
var passport = require("passport");
const { body } = require("express-validator");
session = require("express-session");

const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
//   next();
// });


app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//
app.use(
  session({
    secret: "your secret",
    name: "name of session id",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/servers", serverRoutes);

app.use("/api/users", userRoutes);

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

mongoose
  .connect('mongodb+srv://ariancalabrese:admin@cluster0.b8pxz.mongodb.net/databasearian?retryWrites=true&w=majority', () => {
  console.log("connected to mongo db");
})
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

app.listen(5000);
