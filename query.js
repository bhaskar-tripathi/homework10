
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
                    console.log("returning results to server");
                }
            })
        })
        return promise;
    }

}

module.exports = queries;