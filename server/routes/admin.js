const express = require("express");
//const cors = require("cors");
const router = express.Router();
const {
    getAdmin,
    createAdmin,
    loginAdmin,
    getProfile,
} = require("../controller/adminController");
// Get admin info

router.get("/", getAdmin);

// Create admin
router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.get("/profile", getProfile);
module.exports = router;
