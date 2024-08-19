const express = require("express");
//const cors = require("cors");
const router = express.Router();
const { getAdmin, createAdmin } = require("../controller/adminController");
// Get admin info

router.get("/", getAdmin);

// Create admin
router.post("/register", createAdmin);

module.exports = router;
