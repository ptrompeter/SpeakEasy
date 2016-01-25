//adding requirements for npm requirements

var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var db = require('./models');

// Middleware

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Routes

app.get('/', function(req,res){
  res.render('home');
});

app.get('/about', function(req,res){
  res.render('about');
});



// Controllers

app.use('/auth', require('./controllers/auth.js'));
app.use('/users', require('./controllers/users.js'));
app.use('/messages', require('./controllers/messages.js'));

//App Listen

app.listen(process.env.PORT || 3000);
