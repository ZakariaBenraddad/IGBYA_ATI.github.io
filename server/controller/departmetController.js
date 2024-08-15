const Department = require("../model/departmentModel");
const moongose = require("mongoose");
//get all departments
const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Function to get a specific department by ID
const getDepartmentById = async (req, res) => {
    try {
        if (!moongose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid ID");
        const department = await Department.findById(req.params.id);
        if (!department) return res.status(404).send("Department not found");
        res.json(department);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Function to create a new department
const createDepartment = async (req, res) => {
    try {
        const { name, chefDepartment } = req.body;
        const department = await Department.create({ name, chefDepartment });
        res.status(201).json(department);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Function to update a department by ID
const updateDepartmentById = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!department) return res.status(404).send("Department not found");
        res.json(department);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Function to delete a department by ID
const deleteDepartmentById = async (req, res) => {
    try {
        if (!moongose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid ID");
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) return res.status(404).send("Department not found");
        res.json({ message: "Department deleted successfully" });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Export the functions
module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartmentById,
    deleteDepartmentById,
};
