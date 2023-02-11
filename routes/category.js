const express = require("express");
const app = express();
let fileupload = require("express-fileupload");
app.use(express.static('public'));
const {
  categoryView,
  addCategory,
  CreateCategory,
  EditCategory,
  Update,
  Delete,
} = require("../controllers/categoryController");
const { AdminAuth } = require("../auth/AdminAuth");


const router = express.Router();
router.get("/",AdminAuth,categoryView);
router.get("/addCategory",AdminAuth,addCategory);
router.post('/addcategory',AdminAuth,fileupload(),CreateCategory);
router.get('/edit-category/:catid',fileupload(),AdminAuth,EditCategory);
router.post('/update',fileupload(),AdminAuth,Update);
router.get('/delete/:id',fileupload(),AdminAuth,Delete);

module.exports = router;
