//adding requirements for npm requirements

var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

// Middleware

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Routes

app.get('/', function(req,res){
  res.send('Hello World!');
});

// Controllers


app.listen(process.env.PORT || 3000);
