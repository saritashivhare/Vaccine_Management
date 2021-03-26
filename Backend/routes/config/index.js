var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "saru1234",
  database: "vaccine_management",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

module.exports = connection;
