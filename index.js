var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var SessionStore = require('express-mysql-session');
var connection = require('./seeds/db').connection;
var app = express();

// handlebars setup
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(favicon(__dirname + '/public/img/favicon.ico'))
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.render('home');
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

app.post('/registerAccount', function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    //var firstname
    //var lastname
    console.log(username);
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

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press cntrl+C to terminate.');
});

