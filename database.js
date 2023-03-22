var mysql = require("mysql");

var connection = mysql.createConnection({
 host: 'localhost',
 database :'course_database',
 user:'root',
 password:'root'
});

module.exports= connection;