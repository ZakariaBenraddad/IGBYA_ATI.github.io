const moongose = require("mongoose");

const Schema = moongose.Schema;

const employeeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        matricule: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = moongose.model("Employee", employeeSchema);
