// routes/requests.js
const express = require("express");
const router = express.Router();
const Request = require("../model/newEmployeeInfo");

router.post("/", async (req, res) => {
    try {
        const requestData = new Request(req.body);
        await requestData.save();
        res.status(201).json({ message: "Request saved successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save request", details: err });
    }
});

module.exports = router;
