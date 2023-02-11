//js
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
//For Register Page

const registerView = (req, res) => {
  req.flash('error');
  res.render("register", {});
};
//Post Request for Register
const registerUser = (req, res) => {
  const { name, email, location, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }
  //Confirm Passwords
  if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    User.findOne({ email: email }).then((user) => {
      if(user) {
        //console.log("email exists");
        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        //Validation
        const newUser = new User({
          name,
          email,
          location,
          password,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};
// For View
const loginView = (req, res,) => {
  res.render("login", {messages : req.flash("error")});
};
//Logging in Function
const loginUser = (req,res,next) => {
  const { email, password } = req.body;
  //Required
  if (!email || !password) {
    messages = "";
    req.flash('success', 'Please fill in all the fields');
    res.locals.message = req.flash();
    res.render("login", {
      email,
      password,
      messages,
    });
  } else {
    passport.authenticate("local", {
      successFlash: true,            
      failureFlash: true,
      successRedirect: "/dashboard",
      failureRedirect: "/",
      // successFlash: 'Succesfu1!',
      // failureFlash: 'Invalid username or passwerd.'
    })(req, res,next)
  }
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};