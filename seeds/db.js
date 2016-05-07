var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '',
  password : ''
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  });

connection.end();