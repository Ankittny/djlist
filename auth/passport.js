const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
//Load model
const User = require("../models/User");

const loginCheck = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Check customer
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {message: "Wrong  Username!"});
          }
          //Match Password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'Wrong Password!'});
            }
          });
        })
        .catch((error) => console.log(error));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};

module.exports = {
  loginCheck,
}