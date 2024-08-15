const Employee = require("../model/employeeModel");

// Get all employees
getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get an employee by ID
getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).send("Employee not found");
        res.json(employee);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Create a new employee
createEmployee = async (req, res) => {
    try {
        const { name, department, matricule } = req.body;
        const employee = await Employee.create({ name, department, matricule });
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Update an employee by ID
updateEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!employee) return res.status(404).send("Employee not found");
        res.json(employee);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete an employee by ID
deleteEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).send("Employee not found");
        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById,
};
