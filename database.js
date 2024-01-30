const mysql = require("mysql2/promise")
require("dotenv").config()

const pool = mysql.createPool({
  host: "localhost",
  database: "nodedb",
  user: "root",
  password: "",
  port: 3306
});

module.exports = pool