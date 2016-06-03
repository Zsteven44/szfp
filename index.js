var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// figure out what module '.pass' so we can eventually
// hash passwords.
//
// var hash = require('./pass').hash;
//

var nodemailer = require("nodemailer");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var SessionStore = require('express-mysql-session');
var connection = require('./seeds/db').connection;
var Promise = require("bluebird");
var app = express();

// handlebars setup
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


app.use(cookieParser());
app.use(session({secret: 'anystringatall',
                 saveUninitialized: true,
                 resave: true,
                 cookie: { maxAge: 90000}}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(favicon(__dirname + '/public/img/ggicon.jpg'))
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.render('home');
    console.log(req.cookies);
    console.log(req.session);
});

app.get('/about', function(req,res){
    res.render('about');
});

app.get('/login', function(req,res){
    res.render('login');
});

app.get('/tshirts', function(req,res){
    res.render('tshirts');
});

app.get('/hoodies', function(req,res){
    res.render('hoodies');
});
app.get('/cart', function(req,res){
    res.render('cart');
});
app.get('/registering', function(req,res){
    res.render('registering');
});

app.get('/checkName', function(req,res) {
    var username = req.query.username;
    connection.query('SELECT * FROM  users' +
          ' WHERE username = "' + username + '"',
    function (err, result, fields) {
        console.log("result: "+result.length);

        if (result.length > 0){
            res.status(200).send("denied");
        }else{
            res.status(200).send("okay");
        }
    });
});

app.get('/checkEmail', function(req,res) {
    var email = req.query.email;
    connection.query('SELECT * FROM  users' +
          ' WHERE email = "' + email + '"',
    function (err, result, fields) {
        console.log("is this email taken, result: "+result.length);

        if (result.length > 0){
            res.status(200).send("denied");
        }else{
            res.status(200).send("okay");
        }
    });
});

app.get('/sitelogin', function(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var username_results;
    var password_results;
    var error;
    var RESULT;
    var matches = connection.query('SELECT * FROM users WHERE username ="' + username + '"', function (err, results, fields) {
    //loginStatus(err, results, fields, username, password);
    console.log(matches);
    });

    /*if (error != null) {
                alert(error)
            } else if (username_results === 0 ) {
                console.log('username ' + username + ' does not exist');
                res.status(200).send("username_denied");
            } else if (username_results > 0) {



                if (results == 0 ) {
                    res.status(200).send("password_denied");
                } else {
                    res.status(200).send("okay");
                }
            }
*/
});


app.post('/registerAccount', function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var TABLE = "users";
    console.log("username: " + username + ".  Email: " + email +
        ". Full name: " + firstname + " " + lastname);


    connection.query("INSERT INTO users (firstname, lastname, join_date, username, email, password) VALUES ('" + firstname + "','" + lastname + "', NOW(), '" + username + "', '" + email + "', '" + password + "')",function(err, result)
    {
      if (err)
         throw err;
    });
    res.status(200).send();

})


// custom 404 page
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

//custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

var server = app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press cntrl+C to terminate.');
});

