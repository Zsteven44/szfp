var content = '{{username}} is logged in.';
var source = content;
var template = Handlebars.compile(source);
var data = template( {username: 'Steve'} );
console.log(data);
$('#nav-logged-in').text = data;
