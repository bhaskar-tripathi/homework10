
var mysql = require("mysql");

class queries {
    constructor() {
        // Ser up MySQL connection
        this.connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "testuser",
            password: "test@100",
            database: "employee_db"
        })
    }

    viewAllEmployee() {
        let promise = new Promise((resolve, reject) => {
            var query = "SELECT * FROM employee_db.employee";
            this.connection.query(query, function (err, res) {
                if (err) reject(err)
                else {
                    resolve(res);
                }
            })
        })
        return promise;
    }
    
    viewAllEbyD(department) {
        let promise = new Promise((resolve, reject) => {
            var query = "Select e.id, e.first_name, e.last_name, e.role_id, e.manager_id, d.dept_name" + 
            " from employee as e INNER JOIN role as r "  +
             " ON r.id = e.role_id INNER JOIN department as d " + 
             " ON d.id = r.role_department WHERE r.role_department = ?";
            this.connection.query(query, department, function (err, res) {
                if (err) reject(err)
                else {
                    resolve(res);
                }
            })
        })
        return promise;
    }

    viewAllEbyM(manager_id) {
        let promise = new Promise((resolve, reject) => {
            var query = "Select * from employee WHERE manager_id = ? "
            this.connection.query(query, manager_id, function (err, res) {
                if (err) reject(err)
                else {
                    resolve(res);
                }
            })
        })
        return promise;
    }

    viewAllDepartments() {
        let promise = new Promise((resolve, reject) => {
            var query = "SELECT * FROM employee_db.department";
            this.connection.query(query, function (err, res) {
                if (err) reject(err)
                else {
                    resolve(res);
                }
            })
        })
        return promise;
    }

    getAllManagers() {
        let promise = new Promise((resolve, reject) => {
            var query = "SELECT DISTINCT id as value, concat( first_name, ' ', last_name ) " +
            " as name FROM employee WHERE id IN ( SELECT DISTINCT manager_id FROM employee )";
            this.connection.query(query, function (err, res) {
                if (err) reject(err)
                else {
                    resolve(res);
                }
            })
        })
        return promise;
    }

    getAllEmployees() {
        let promise = new Promise((resolve, reject) => {
            var query = "SELECT id as value, concat( first_name, ' ', last_name ) as name FROM employee";
            this.connection.query(query, function (err, res) {
                if (err) reject(err)
                else {
                    resolve(res);
                }
            })
        })
        return promise;
    }

    viewAllRoles() {
        let promise = new Promise((resolve, reject) => {
            var query = "SELECT * FROM employee_db.role";
            this.connection.query(query, function (err, res) {
                if (err) reject(err)
                else {
                    resolve(res);
                }
            })
        })
        return promise;
    }

    addEmployee(empDetails) {
        let promise = new Promise((resolve, reject) => {
            var query = "INSERT INTO employee_db.employee VALUES ( ? , ? , ? , ? , ?)";
            this.connection.query(query, [
                null,
                empDetails.fname,
                empDetails.lname,
                empDetails.roleid,
                empDetails.managerid
            ] ,function (err, res) {
                if (err) reject(err)
                else {
                    resolve("Employee Successfully Added!");
                }
            })
        })
        return promise;
    }

    addRole(roleDetails) {
        let promise = new Promise((resolve, reject) => {
            var query = "INSERT INTO employee_db.role VALUES ( ? , ? , ? , ?)";
            this.connection.query(query, [
                null,
                roleDetails.rname,
                roleDetails.salary,
                roleDetails.departmentid
            ] ,function (err, res) {
                if (err) reject(err)
                else {
                    resolve("Role Successfully Added!");
                }
            })
        })
        return promise;
    }
    addDepartment(departmentDetails) {
        let promise = new Promise((resolve, reject) => {
            var query = "INSERT INTO employee_db.department VALUES ( ? , ? )";
            this.connection.query(query, [
                null,
                departmentDetails.dname
            ] ,function (err, res) {
                if (err) reject(err)
                else {
                    resolve("Department Successfully Added!");
                }
            })
        })
        return promise;
    }
    updateEmployee(employeeUpdDetails){
        let promise = new Promise((resolve, reject) => {
            var query = "UPDATE employee_db.employee SET role_id = ? WHERE id = ?";
            this.connection.query(query, [
                employeeUpdDetails.roleid,
                employeeUpdDetails.empid
            ] ,function (err, res) {
                if (err) reject(err)
                else {
                    resolve("Employee Role Successfully Updated!");
                }
            })
        })
        return promise;
    }

}

module.exports = queries;