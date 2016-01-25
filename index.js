//adding requirements for npm requirements

var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var db = require('./models');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

// Middleware

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//.uses for authentication
app.use(session({ secret: 'Manymanyallthes3kr3tz', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Serialize user
passport.serializeUser(function(user, done){
  done(null, user.id);
});

//Deserialize user
passport.deserializeUser(function(id, done){
  db.user.find(id).then(function(user){
    done(null, user.get());
  }).catch(done);
});

//Passport local Strategy
passport.use(new localStrategy(
 function(username,password,done){
   db.user.find({where: {userName: username}}).then(function(user){
     if(user){
       user.checkPassword(password,function(error,result){
         if(error) return done(error);
         if(result){
           done(null,user.get());
         }else{
           done(null,false,{message: 'Invalid Password.'});
         }
       });
     }else{
       done(null,false,{message: 'Unknown user. Please sign up.'});
     }
   });
 }
));

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
