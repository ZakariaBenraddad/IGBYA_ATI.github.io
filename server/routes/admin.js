const express = require("express");
const router = express.Router();

// Get admin info
router.get("/", (req, res) => {
    res.json(admin);
});

module.exports = router;
