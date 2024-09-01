const express = require("express");
const router = express.Router();
const {
    getAdmin,
    createAdmin,
    loginAdmin,
    getProfile,
    logoutAdmin,
} = require("../controller/adminController");

// Get admin info
router.get("/", getAdmin);

// Create admin (registration)
router.post("/register", createAdmin);

// Login admin
router.post("/login", loginAdmin);

// Get admin profile
router.get("/profile", getProfile);

// Logout admin
router.post("/logout", logoutAdmin);

module.exports = router;
