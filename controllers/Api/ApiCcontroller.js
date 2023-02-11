const express = require("express");
const Category = require("../../models/Category");
const banner = require("../../models/banner.js");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

let jwtSecretKey = process.env.JWT_SECRET_KEY;
let Url = process.env.url;

const Register = (req, res) => {
  let sampleFile;
  let uploadPath;
  const { name, email, address, pincode, mobile, password, djname,city_id } = req.body;
  try {
    User.findOne({email: email }).then((user) => {
      if (user) {
        res.json({ status:2, message: "email exists" }).status(200).send();
      } else {
        //Validation
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send("No files were uploaded.");
        }
        sampleFile = req.files.image;
        uploadPath = "public/static/img/" + sampleFile.name;
        sampleFile.mv(uploadPath);
        const newUser = new User({
          name,
          email,
          address,
          pincode,
          mobile,
          password,
          djname,
          city_id,
        });
        newUser.image = sampleFile.name;
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(
                res
                  .json({ status:1,message: "Your Registration SuccessFul!" })
                  .status(200)
                  .send()
              )
              .catch((err) => console.log(err));
          })
        );
      }
    });
  } catch (error) {
    return res.status(401).send(error);
  }
};
const Login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ email: username })
    .then((user) => {
      if (!user) {
        res
          .json({ status: 201, message: "Wrong  Username!" })
          .status(200)
          .send();
      }
      //Match Password
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) throw error;
        if (isMatch) {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
              password: user.password,
              name: user.name,
            },
            jwtSecretKey
          );
          let data = {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: token,
          };
          res.json({ status: 200, data: data }).status(200).send();
        } else {
          res
            .json({ status: 201, message: "Wrong  Password!" })
            .status(400)
            .send();
        }
      });
    })
    .catch((error) => console.log(error));
};

const Categorys = (req, res) => {
  if (req.method === "POST") {
    // try {
      // const token = req.headers.authorization.split(" ")[1];
      // const verified = jwt.verify(token, jwtSecretKey);
      // if (verified) {
        try {
          Category.find({})
            .sort("-date")
            .exec(function (err, cat) {
              if (err) {
                console.log(err);
              } else {
                let datas = [];
                cat.forEach((element) => {
                  datas.push({
                    id: element._id,
                    name: element.name,
                    slug: element.slug,
                    image: Url + element.image,
                  });
                });
                res.json({ status: 200, data: datas }).status(200).send();
              }
            });
        } catch (error) {
          return res.status(401).send(error);
        }
      // } else {
      //   // Access Denied
      //   return res
      //     .json({ msg: "please Enter Bearer Token" })
      //     .status(200)
      //     .send(error);
      // }
    // } catch (error) {
    //   // Access Denied
    //   return res.status(401).send(error);
    // }
  } else {
    return res
      .json({ data: "please Select POST Method" })
      .status(200)
      .send(error);
  }
};

const DjList = (req, res) => {
  if (req.method === "POST") {
    const {city_id} = req.body;
      console.log(city_id);
    try {
      User.find({city_id:city_id})
            .sort("-date")
            .exec(function (err, cat) {
              if (err) {
                console.log(err);
              } else {
                let datas = [];
                cat.forEach((element) => {
                  datas.push({
                    id: element._id,
                    name: element.name,
                    email: element.email,
                    mobile: element.mobile,
                    address: element.address,
                    location: element.location,
                    djname: element.djname,
                    pincode: element.pincode,
                    date:element.date,
                    image: Url + element.image,
                  });
                });
                res.json({ status: 200, data: datas }).status(200).send();
              }
            });
    } catch (error) {
      return res.json({ data: error }).status(200).send(error);
    }
  } else {
    return res
      .json({ data: "please Select Post Method" })
      .status(200)
      .send(error);
  }
};

const Banner=(req,res) =>{
  if(req.method=="POST"){
  try{
     banner.find({})
     .sort("-date")
     .exec(function(err,item){
       if(err){
        console.log(err)
       } else {
        let datas = [];
        item.forEach((element)=>{
          datas.push({
            id:element._id,
            title:element.title,
            slug:element.slug,
            status:element.status,
            image: Url + element.image,
          });
        });
        res.json({status:200,data:datas}).status(200).send();
       }
     });
  } catch(err){
    return res.json({data:err}).status(200).send(error);
  }
  }else {
    return res
    .json({
      data:"Please Select Post Method"})
      .status(200)
      .send();
  }
}


module.exports = {
  Login,
  Categorys,
  Register,
  DjList,
  Banner,
};
