const passport = require("passport");
const SteamStrategy = require("../lib/").Strategy;
const keys = require("./keys");
const User = require("../models/user-model");

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, { id: user.id });
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  // User.findById(id)
  // .then((user) => {
  //   done(null, user);
  // })
  // .catch((e) => {
  //   console.log(id);
  //   //console.log(e);
  //   done(new Error("Failed to deserialize an user"));
  // });
  done(null, id);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5000/api/users/steam/return",
      realm: "http://localhost:5000/api/users/",
      apiKey: "2BF27FFE923985429974F41F1E98B3B8",
    },

    async (identifier, profile, done) => {
      try {
        process.nextTick(async function () {
          console.log(profile);
          profile.identifier = identifier;

          //BUSCO EL USUARIO EN LA BASE DE DATOS
          const currentUser = await User.findOne({
            steamid: profile._json.steamid,
          });
          //SI NO ESTA, SIGNIFICA QUE TENGO QUE CREARLO
          if (!currentUser) {
            const newUser = await new User({
              name: profile._json.realname,
              steamid: profile._json.id_str,
            }).save();
            if (newUser) {
              done(null, newUser);
            }
          }
          return done(null, currentUser);
        });
      } catch (error) {
        console.log(error);
        return done(null, profile);
      }
    }
  )
);
