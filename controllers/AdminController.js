//js

const Admin = require("../models/Admin");
const {ObjectId} = require('mongodb');
const storage = require('sessionstorage');
//For Register Page

// For View
const AdminView = (req, res,) => {
  res.render("login", {messages : req.flash("error")});
};
//Logging in Function
const LoginAdmin = (req, res,next) => {
  const { email, password } = req.body;
  //Required
  if (!email && !password) {
    console.log(password);
      messages = "";
      req.flash('success', 'Please fill in all the fields');
      res.locals.message = req.flash();
      res.render("login", {
        email,
        password,
        messages,
      });
  }if(!email){
    messages = "";
    req.flash('success', 'Please fill Username');
    res.locals.message = req.flash();
    res.render("login", {
      email,
      password,
      messages,
    });
  }if(!password){
    messages = "";
    req.flash('success', 'Please fill Password');
    res.locals.message = req.flash();
    res.render("login", {
      email,
      password,
      messages,
    });
  } else {
    Admin.findOne({ email: email })
    .then((admin) => {
      if(!admin) {
        messages = "";
        req.flash('success', 'Wrong  Username');
        res.locals.message = req.flash();
        res.render("login", {
          email,
          password,
          messages,
        });
      } else {
        storage.setItem('admin',admin);
        res.redirect("/dashboard");
      }
    }).catch((error) => console.log(error));
  }
};
module.exports = {
  AdminView,
  LoginAdmin,
};