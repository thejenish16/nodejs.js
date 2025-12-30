const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    emp_name: {
        type: String,
        required: true,
    },
    emp_email: {
        type: String,
        required: true,
    },
    emp_password: {
        type: String,
        required: true,
    },
    emp_gender: {
        type: String,
        required: true,
    },
    emp_salary: {
        type: Number,
        required: true,
    },
    emp_hobby: {
        type: Array,
        required: true,
    },
    emp_role: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Employee", empSchema, "Employee");