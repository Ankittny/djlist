//js
const banner = require("../models/banner.js");
const express = require("express");
const app = express();

let Url = process.env.url;

app.use(express.static("public"));
const fileUpload = require("express-fileupload");
const storage = require("sessionstorage");
//For Register Page
app.use(fileUpload());

const Banner = (req, res, next) => {
  try {
    banner.find({})
      .sort("-date")
      .exec(function (err, banner) {
        if (err) {
          console.log(err);
        } else {
          res.render("banners/banner", {
            user: storage.getItem("admin"),
            data: banner,
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};

const addBanner = (req, res, next) => {
    try{
        res.render("banners/addbanner", {
            user: storage.getItem("admin"),
            loginMessage:"",
          });
    } catch(err){
        console.log(err);
    }
};

const PostBanner =(req,res,next) =>{
    const {title,slug,status} = req.body;

    
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).send("no file ware uploaded");
    }

    sampleFile = req.files.image;
    uploadPath = "public/static/img/" + sampleFile.name;
    sampleFile.mv(uploadPath,function(err){
        if(err){
            return res.status(500).send(err);
        } else {
            const bann = new banner({
                title,
                slug,
                status,
            });
            bann.image = sampleFile.name;

            if(bann.save()){
                req.flash('loginMessage','banner create Successful!');
                res.redirect('/banner');
            } else {
                req.flash('loginMessage','banner not add!');
                res.redirect('/banner');
            }
        }
    });
} 

const EditBanner =(req,res) => {
    try{
        console.log(req.params.bannid);
        banner.findOne({_id:req.params.bannid},function(err,item){
            if(err){
                res.json({
                    error: err,
                  });
            } 
            res.render("banners/editbanner", {
                user: storage.getItem('admin'),
                data: item,
                loginMessage:""
            });
        }); 
    } catch(err){
        console.log(err);
    }
}



const Delete = (req, res) =>{
    try{
        banner.deleteOne({_id:req.params.id},function(){
            res.redirect("/banner");
        });
    } catch(err){
        console.log(err);
    }
}


module.exports = {
  Banner,
  addBanner,
  PostBanner,
  Delete,
  EditBanner
};
