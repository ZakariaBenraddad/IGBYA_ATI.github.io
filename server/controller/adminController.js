const Admin = require("../model/adminModel");
const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
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

        // Create the admin
        const admin = new Admin({ username, email, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: "Admin created successfully" });
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
            const token = jwt.sign(
                { email: admin.email, id: admin._id, username: admin.username },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            // Set session
            req.session.adminId = admin._id;
            req.session.token = token;

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3600000, // 1 hour
            }).json({ message: "Login successful" });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
};

const getProfile = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id).select("-password");

        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        res.json(admin);
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid token" });
        }
        res.status(500).json({ error: "Server error" });
    }
};

const logoutAdmin = (req, res) => {
    res.clearCookie("token");
    req.session.destroy((err) => {
        if (err) {
            return res
                .status(500)
                .json({ error: "Couldn't log out, please try again" });
        }
        res.json({ message: "Logged out successfully" });
    });
};

module.exports = { getAdmin, createAdmin, loginAdmin, getProfile, logoutAdmin };
