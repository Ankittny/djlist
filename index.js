const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);
const path = require('path');
const flash = require('connect-flash');
mongoose.set("strictQuery", false);
const cors = require('cors');
app.use(flash());

app.use(express.json());

var bodyParser = require('body-parser');

//enables cors

var whitelist = ['http://localhost:3001', 'http://localhost:3000']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions));



// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("e don connect"))
  .catch((err) => console.log(err));
app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
}));
  

app.use(passport.initialize());
app.use(passport.session());
// api route
app.use('/api',require("./routes/ApiRoute"));

//Routes

app.use("/", require("./routes/AdminRoute"));
app.use("/category", require("./routes/category"));
app.use("/banner", require("./routes/Banner"));



app.get('/logout',  function (req, res, next)  {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
// app.use(cors());



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server has started at port " + PORT));