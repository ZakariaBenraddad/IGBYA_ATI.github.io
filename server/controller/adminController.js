const Admin = require("../model/adminModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.find();
        res.json(admin);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username) {
            return res.status(400).json({
                error: "Username is required",
            });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters long",
            });
        }

        // Check if the email already exists
        const exist = await Admin.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: "Email already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin
        const admin = new Admin({ username, email, password: hashedPassword });
        await admin.save();

        res.status(201).json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { getAdmin, createAdmin };
