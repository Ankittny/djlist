const express = require("express");
const app = express();
let fileupload = require("express-fileupload");
app.use(express.static('public'));
const {
  Banner,
  addBanner,
  PostBanner,
  Delete,
  EditBanner
} = require("../controllers/BannerController.js");
const { AdminAuth } = require("../auth/AdminAuth");


const router = express.Router();

router.get("/",AdminAuth,Banner);
router.get("/addBanner",AdminAuth,addBanner);
router.post('/addBanner',AdminAuth,fileupload(),PostBanner);
router.get('/editbanner/:bannid',AdminAuth,EditBanner);
// router.post('/update',fileupload(),AdminAuth,Update);
router.get('/delete/:id',AdminAuth,Delete);

module.exports = router;
