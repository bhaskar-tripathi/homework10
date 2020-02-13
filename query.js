
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

}

module.exports = queries;