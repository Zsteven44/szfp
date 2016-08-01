var mysql      = require('mysql');
var options = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'szfp',
  port     : '3000'
};

var connection = mysql.createConnection(options);

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


module.exports = {options: options, connection: connection};

