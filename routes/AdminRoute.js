const express = require("express");

const {
    AdminView,
    LoginAdmin,
} = require("../controllers/AdminController");
const { dashboardView } = require("../controllers/dashboardController");

const router = express.Router();
router.get("/", AdminView);
router.post('/loginadmin',LoginAdmin);
router.get("/dashboard", dashboardView);

module.exports = router;
