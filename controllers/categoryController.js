//js
const Category = require("../models/Category");
const express = require("express");
const app = express();
let Url = process.env.url;
app.use(express.static("public"));
const fileUpload = require("express-fileupload");
const storage = require('sessionstorage');
//For Register Page
app.use(fileUpload());

const categoryView = (req, res, next) => {
  Category.find({})
    .sort("-date")
    .exec(function (err, cat) {
      if (err) {
        console.log(err);
      } else {
        res.render("categorys/category", { user: storage.getItem('admin'), data: cat });
      }
    });
};

const addCategory = (req, res) => {
  res.render("categorys/addcategory", { user: storage.getItem('admin'),loginMessage:"" });
};

const CreateCategory = (req, res) => {
  let sampleFile;
  let uploadPath;
  const { name, parent_id, slug, status } = req.body;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.image;
  uploadPath = "public/static/img/" + sampleFile.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if(err) {
      return res.status(500).send(err);
    } else {
      const Cat = new Category({
        name,
        parent_id,
        slug,
        status,
      });
      Cat.image = sampleFile.name;
      if(Cat.save()){
        req.flash('loginMessage', 'You need to be authenticated to access this page');
        //console.log(req.flash('loginMessage'))
        res.redirect("/category");
      } else {
        req.flash('loginMessage', 'You need to be authenticated to access this page');
        res.redirect("/category");
      }
    }
  });
};

const EditCategory = (req, res) => {
  let myCat;
  Category.find({}, function (err, allcatdata) {
    if (err) {
      res.json({
        error: err,
      });
    }
    myCat = allcatdata;
  });

  Category.findOne({ _id: req.params.catid }, function (err, catdata) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.render("categorys/editcategory", {
      user: storage.getItem('admin'),
      catdata: catdata,
      myCat: myCat,
    });
  });
};

const Update = (req, res) => {
  let sampleFile;
  let uploadPath;
  let image;
  const { name, slug, status, id, oldimage,roll} = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    Category.findOneAndUpdate(
      { _id: id },
      { $set: { name: name, status: status, slug: slug, image: oldimage,roll:roll } },
      function (err, success) {
        res.redirect("/category");
      }
    );
  } else {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.image;
    uploadPath = "public/static/img/" + sampleFile.name;
    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      } else {
        image = sampleFile.name;
      }

      Category.findOneAndUpdate(
        { _id: id },
        { $set: { name: name, status: status, slug: slug, image: image } },
        function (err, success) {
          res.redirect("/category");
        }
      );
    });
  }
};

const Delete = (req, res) => {
  Category.deleteOne({ _id: req.params.id }, function (err, result) {
    res.redirect("/category");
  }).catch((err) => console.log(err));
};

module.exports = {
  categoryView,
  addCategory,
  CreateCategory,
  EditCategory,
  Update,
  Delete,
};
