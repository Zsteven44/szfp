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
var options = require('./seeds/db').options;
var Promise = require("bluebird");
var app = express();
var genuuid = require('./utils/genuuid');


var sessionStore = new SessionStore(options);



// handlebars setup
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// session setup
app.use(cookieParser());
app.use(session({
    genid: function(req) {
        return genuuid();
    },
    key:'session_cookie_name',
    secret: 'anystringatall',
    store: sessionStore,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 90000}}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(favicon(__dirname + '/public/img/ggicon.jpg'))
app.use(express.static(__dirname + '/public'));

var sess;

///////////////////////
//                   //
// THE ROUTES BELOW  //
//                   //
///////////////////////

app.get('/', UserLoggedInCheck, HomeRender);

app.get('/about', function(req,res){
    if (req.session.id) {
        }
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
    connection.query('SELECT email FROM  users' +
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

    connection.query('SELECT * FROM users WHERE username ="' + username + '" and password = "' + password + '"', function (err, results, fields) {
        if (err) {
            throw error;
        } else if (results.length == 1) {

            connection.query('UPDATE users SET session_id = "' + req.session.id + '" WHERE username = "' + username +'"', function (err, results, fields) {
                if (err) {
                    throw error;
                } else {
                    console.log('this is the new sess.id: ' + req.session.id);

                    res.status(200).send("okay");
                }
            });
        } else {
            res.status(200).send('denied');
        }
    });
});


app.post('/registerAccount', function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var TABLE = "users";
    console.log("username: " + username + ".  Email: " + email +
        ". Full name: " + firstname + " " + lastname + ". The session id saved: " + req.session.id);


    connection.query("INSERT INTO users (firstname, lastname, join_date, username, email, password, session_id) VALUES ('" + firstname + "','" + lastname + "', NOW(), '" + username + "', '" + email + "', '" + password + "', '" + req.session.id + "')",function(err, result)
    {
      if (err) {
         throw err;
      }
    });
    res.status(200).send();

})



var server = app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press cntrl+C to terminate.');
});

function UserLoggedInCheck (req, res, next) {
    sess = req.session;
    console.log('This is the session id, checking to see if it exists (index.js): ' + sess.id);
    if (sess) {
        console.log('The session exists: ' + JSON.stringify(req.session));
        connection.query('SELECT * from users WHERE session_id = "' + sess.id + '"', function (err, results, fields) {
            LoggedInCheck2(err, results, next);
        });
    } else {
        console.log('there is no session for this user.  This case should not occur.');

    }
}

function LoggedInCheck2(err, results, next) {
    if (err) {
        console.log(err + ', there was an error.');
        throw error;
    } else if (results.length == 1) {
        sess.data = {isLogged: true, username: results[0].username, userid: results[0].user_id, fname: results[0].firstname, cartcount: 0};
        console.log(results);
        console.log('the user id is:' + sess.data.userid +'. The username is: ' + sess.data.username +'. The firstname is: ' + sess.data.fname + '.');

        next();
    } else {
        console.log('There was no existing session that matched.');
        sess.data = {isLogged: false, username: null, userid: null, fname: null, cartcount: 0};;
        next();
    }
}



function HomeRender(req,res) {
        sess = req.session;

        if (sess.data.isLogged == true) {
            res.render('home', sess.data, layout:"loggedin");
        } else {
            res.render('home', sess.data);
        }

};


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