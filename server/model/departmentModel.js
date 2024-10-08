const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        chefDepartment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
