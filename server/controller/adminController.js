const Admin = require("../model/adminModel");
const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { token } = require("morgan");
dotenv.config();
const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.find();
        res.json(admin);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// register endpoint
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
        const hashedPassword = await hashPassword(password);
        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin
        const admin = new Admin({ username, email, password: hashedPassword });
        await admin.save();

        res.status(201).json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//login endpoint
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        // check if password is correct
        const isMatch = await comparePassword(password, admin.password);
        if (isMatch) {
            jwt.sign(
                { email: admin.email, id: admin._id, username: admin.username },
                process.env.JWT_SECRET,
                {},
                (err, result) => {
                    if (err) throw err;
                    res.cookie("token", token).json(admin);
                }
            );
            res.json("Password match");
        }
        if (!isMatch) {
            res.json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports = { getAdmin, createAdmin, loginAdmin };
