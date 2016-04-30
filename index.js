var express = require('express');
var app = express();
// handlebars setup
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

app.get('/', function(req,res){
    res.type('text/plain');
    res.send('ggscrub')
});

app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About ggscrub');
});

g



// custom 404 page
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
//custom 500 page
app.use(function(err, req, res, next){
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press cntrl+C to terminate.');
});

