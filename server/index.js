const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Routes
const departmentsRouter = require("./routes/departments");
const employeesRouter = require("./routes/employees");
const adminRouter = require("./routes/admin");

// Middleware
app.use(express.json());

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

//connect to db
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
