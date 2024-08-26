// models/Request.js
const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    requestType: { type: String, required: true },
    serviceRequested: { type: [String], required: true },
    requester: {
        lastName: { type: String, required: true },
        firstName: { type: String, required: true },
        employeeId: { type: String, required: true },
        department: { type: String, required: true },
        site: { type: String, required: true },
        requestDate: { type: Date, required: true },
    },
    beneficiary: {
        lastName: { type: String },
        firstName: { type: String },
        employeeId: { type: String },
        phone: { type: String },
        email: { type: String },
        partnerCompany: { type: String },
    },
});

module.exports = mongoose.model("Request", RequestSchema);
