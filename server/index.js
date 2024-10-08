const express = require("express");
const session = require("express-session");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const path = require("path");
const docx = require("docx");
const fs = require("fs");
const cors = require("cors");
//const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Routes
const departmentsRouter = require("./routes/departments");
const employeesRouter = require("./routes/employees");
const adminRouter = require("./routes/admin");
const requestsRouter = require("./routes/newEmployeeInfoRoute");
const todoRouter = require("./routes/todoListRoutes");
const documentGenerationRoutes = require("./routes/generateDocument");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
        }, // 1 hour
    })
);

app.use(
    cors({
        origin: "http://localhost:5173", // Update with your frontend's URL
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        credentials: true, // If you're using cookies or other credentials
    })
);
//set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/departments", departmentsRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/admin", adminRouter);
app.use("/api/requests", requestsRouter);
app.use("/api/todos", todoRouter);
app.use("/api", documentGenerationRoutes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                `Server is running on port ${port} and Connected to MongoDB `
            );
        });
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
    });
