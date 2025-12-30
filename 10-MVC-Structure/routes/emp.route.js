const express = require('express');

const { employeeFormPage, addEmployee, allEmployeePage, deleteEmployee, editEmployeePage, updateEmployee } = require("../controllers/emp.controller");

const empRoute = express.Router();

empRoute.get('/', employeeFormPage);
empRoute.post('/addEmp', addEmployee);
empRoute.get('/allEmployeePage', allEmployeePage);
empRoute.get('/delete/:id', deleteEmployee);
empRoute.get('/edit/:id', editEmployeePage);
empRoute.post('/update/:id', updateEmployee);

module.exports = empRoute;