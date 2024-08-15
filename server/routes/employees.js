const express = require("express");
const router = express.Router();
const cors = require("cors");

const Employee = require("../model/employeeModel");
const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById,
} = require("../controller/employeeController");

// router.use(
//     cors({
//         credentials: true,
//         origin: "http://localhost:5173/",
//     })
// );

// Get all employees
router.get("/", getAllEmployees);

// Get a specific employee by ID
router.get("/:id", getEmployeeById);

// Create a new employee
router.post("/", createEmployee);

// Update an employee
router.put("/:id", updateEmployeeById);

// Delete an employee
router.delete("/:id", deleteEmployeeById);

module.exports = router;
