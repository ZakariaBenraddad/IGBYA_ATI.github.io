const express = require("express");
const router = express.Router();
const cors = require("cors");
const Department = require("../model/departmentModel");
const {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartmentById,
    deleteDepartmentById,
} = require("../controller/departmetController");

// router.use(
//     cors({
//         credentials: true,
//         origin: "http://localhost:5173/",
//     })
// );

// Get all departments
router.get("/", getAllDepartments);

// Get a specific department by ID
router.get("/:id", getDepartmentById);

// Create a new department
router.post("/", createDepartment);

// Update a department
router.put("/:id", updateDepartmentById);

// Delete a department
router.delete("/:id", deleteDepartmentById);

module.exports = router;
