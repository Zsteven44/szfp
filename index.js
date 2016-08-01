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

app.set('port', process.env.PORT || 8080);

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
app.use('/products', express.static('public'));
var sess;

///////////////////////
//                   //
// THE ROUTES BELOW  //
//                   //
///////////////////////

app.get('/', UserLoggedInCheck, function (req,res) {
    sess = req.session;
    res.render('home', sess.data);
});

app.get('/about', UserLoggedInCheck, function (req,res){
    sess = req.session;
    res.render('about', sess.data);
});

app.get('/new', UserLoggedInCheck, function (req,res){
    sess =req.session;
    res.render('new', sess.data);
});

app.get('/login', UserLoggedInCheck, function (req,res){
    sess = req.session;
    res.render('login', sess.data);
});

app.get('/tshirts', UserLoggedInCheck, function (req,res){
    sess = req.session;
    res.render('tshirts', sess.data);
});

app.get('/hoodies', UserLoggedInCheck, function (req,res){
    sess = req.session;
    res.render('hoodies', sess.data);
});
app.get('/cart', UserLoggedInCheck, function (req,res){
    sess = req.session;
    res.render('cart', sess.data);
});
app.get('/registering', UserLoggedInCheck, function (req,res){
    sess = req.session;
    res.render('registering', sess.data);
});

app.get('/profile', UserLoggedInCheck, function (req,res){
    sess = req.session;
    if (sess.data.isLogged == false) {
        res.redirect('/login');
    } else {
        res.render('profile', sess.data);
    }
});

//////////////////////
//                  //
//  PRODUCT ROUTES  //
//                  //
//////////////////////

app.get('/products/:productid', UserLoggedInCheck, function(req,res){
    console.log('product to be viewed is: ' + req.params.productid)
    res.render('products/'+req.params.productid, sess.data)
});



///////////////
//           //
//  QUERIES  //
//           //
///////////////

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
    sess = req.session;
    connection.query('SELECT * FROM users WHERE username ="' + username + '" and password = "' + password + '"', function (err, results, fields) {
        if (err) {
            throw error;
        } else if (results.length == 1) {
            console.log("The results: " + results);
            console.log("This is results[0]: " + results[0]);
            console.log("Not sure what else to put, json Stringify: " + JSON.stringify(results));
            sess.data = {isLogged: true, username: results[0].username,  userid: results[0].user_id, email: results[0].email, fname: results[0].firstname, lname: results[0].lastname, cartcount: 0, joindate: results[0].join_date, layout: 'loggedin'};
            connection.query('UPDATE users SET session_id = "' + req.session.id + '" WHERE username = "' + username +'"', function (err, results, fields) {
                if (err) {
                    throw error;
                } else {
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
    var transporter = nodemailer.createTransport("SMTP",{
        service: "gmail",
        debug: true,
        auth: {
            user: 'zsteven@ggscrub.com',
            pass: 'sz@ggscrub44'
        }
    });
    var mailOptions = {
        from: 'Steven Zafrani <zsteven@ggscrub.com>',
        to: email,
        subject: "GGscrub Registration Notice",
        text: 'This is an email confirming your account creation at GGscrub.com. Submission by ' + firstname + ' ' + lastname + '.  The profile username is ' + username + '.  If you did not create an account at GGscrub.com, please ignore this email.',
        html: '<p>This is an email confirming your account creation at GGscrub.com. Submission by ' + firstname + ' ' + lastname + ' with the username ' + username + '.</p>'

    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Message Sent: " + info.response);
        }
    });

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

app.get('/sitelogout', function (req,res) {
    sess=req.session;
        if (sess.data) {
            if (sess.data.isLogged == true) {
                console.log(sess.data.username + ' is logging out...')
                sess.data = {isLogged:false, username:null,userid:null, fname:null, lname:null, joindate:null, email:null, cartcount: 0, layout:'main'};
            } else {
                console.log('Error with UserLogOut sess.data.isLogged.');
            }
        } else {
            console.log('Error with UserLogOut sess.data.');

    }
    res.status(200).send('okay');

});



//////////////////////////
//                      //
//  LOG IN / LOG OUT    //
//                      //
//////////////////////////

function UserLoggedInCheck (req, res, next) {
    sess = req.session;
    console.log('This is the session id, checking to see if it exists: ' + sess.id);
    if (sess.data) {
        if (sess.data.isLogged == true) {
            sess.data.layout = 'loggedin';
            next();
        } else if (sess.data.isLogged == false) {
            sess.data.layout = 'main';
            next();
        } else {
            console.log('there is no session for this user.  This case should not occur.');
        }
    } else {
        console.log('New user detected. Creating sess.data...');
        sess.data = {isLogged: false, username: null, userid: null, fname: null, lname: null, joindate: null, email:null, cartcount: 0, layout:'main'};
        next();
    }
}


function UserLogOut (req,res,next) {
    sess=req.session;
    if (sess.data) {
        if (sess.data.isLogged == true) {
            console.log(sess.data.username + ' is logging out...')
            sess.data = {isLogged:false, username:null,userid:null, fname:null, lname:null, joindate:null, email:null, cartcount: 0, layout:'main'};
        } else {
            console.log('Error with UserLogOut sess.data.isLogged.');
        }
    } else {
        console.log('Error with UserLogOut sess.data.');

    }
}

///////////////////
//               //
//  PAGE RENDER  //
//               //
///////////////////











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