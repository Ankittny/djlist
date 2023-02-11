const express = require("express");

const app = express();
app.use(express.json());
const {
  Login,
  Categorys,
  Register,
  DjList,
  Banner,
} = require("../controllers/Api/ApiCcontroller.js");
let fileupload = require("express-fileupload");

const { protectRoute } = require("../auth/protect");
const { route } = require("express/lib/router/index.js");

const router = express.Router();



router.post("/category",Categorys);
router.post("/djlist",DjList);
router.post("/banner",Banner);

router.post('/register',fileupload(),Register);
router.post("/login",Login);

module.exports = router;
