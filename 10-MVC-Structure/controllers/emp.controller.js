const Employee = require("../models/emp.model");

const employeeFormPage = (req, res) => {
    return res.render('empForm');
}

const addEmployee = async (req, res) => {
    console.log("Insert EMP");
    console.log(req.body);

    const addEmp = await Employee.create(req.body);

    if (addEmp) {
        console.log("Employee inserted successfully......");
    } else {
        console.log("Employee insertion failed...");
    }

    return res.redirect('/employee/allEmployeePage');
}

const allEmployeePage = async (req, res) => {

    const allEmp = await Employee.find();

    return res.render('allEmployeePage', { allEmp });
}

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    
    const deleteEmp = await Employee.findByIdAndDelete(id);
    
    if (deleteEmp) {
        console.log("Employee deleted successfully......");
    } else {
        console.log("Employee deletion failed...");
    }
    
    return res.redirect('/employee/allEmployeePage');
}

const editEmployeePage = async (req, res) => {
    const { id } = req.params;
    
    const emp = await Employee.findById(id);
    
    return res.render('empForm', { emp });
}

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    
    const updateEmp = await Employee.findByIdAndUpdate(id, req.body);
    
    if (updateEmp) {
        console.log("Employee updated successfully......");
    } else {
        console.log("Employee update failed...");
    }
    
    return res.redirect('/employee/allEmployeePage');
}

module.exports = {
    employeeFormPage,
    addEmployee,
    allEmployeePage,
    deleteEmployee,
    editEmployeePage,
    updateEmployee
}