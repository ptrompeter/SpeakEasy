//adding requirements for npm requirements

var express = require('express');

// Middleware
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var db = require('./models');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var cookieParser = require('cookie-parser');
var onceperday = false;


//Chat connection and Code (Socket)//
var rooms;
io.on('connection', function(socket) {

    console.log('new connection made, id=' + socket.id);
    socket.on('room', function(room) {
          rooms = room;
          console.log('Connected to room: '+rooms);
          socket.join(room);
      });

    socket.on('msg', function(incomingMsg) {
        io.to(rooms).emit('msg', incomingMsg);
    });
});


console.log(rooms+ " out");
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

//.uses for authentication
app.use(session({secret: 'M4nym4ny411the53kr3tZ', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Serialize user
passport.serializeUser(function(user, done){
  done(null, user.id);
});

//Deserialize user
passport.deserializeUser(function(id, done){
  db.user.findById(id).then(function(user){
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

//Set User for session
app.use(function(req,res,next){
  if(req.session.user){
    db.user.findById(req.session.user).then(function(user){
      req.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    next();
  }
});

app.use(function(req,res,next){
  app.locals.currentUser = req.user;
  app.locals.alerts = req.flash();
  next();
});

// Routes

app.get('/', function(req,res){
  res.render('home');
});

app.get('/about', function(req,res){
  res.render('about');
});


app.get('/users', function(req, res){
  var currDay = getCookie(req.headers, 'onceperday');
  onceperday =  (currDay !== '') ? true : false;
  if (req.user.matchWaiting === true) {
    db.user.findAll({ where: {userName: req.user.sentBy}})
    .then(function(thePal){
      res.render('users', {onceperday: onceperday, pending: true, newPal: thePal});
    });
  } else {
    res.render('users', {onceperday: onceperday});
  }
});


app.get('/chat', function(req, res) {
  res.render('chat');
});

function loginCheck(req, res) {
  if (typeof req.body.id === 'undefined'){
    req.flash('danger','Please login or create a new account.')
    res.redirect('/');
  }
}


// Controllers
//app.use('/chat', require('./controllers/chat.js'));
app.use('/auth', require('./controllers/auth.js'));
app.use('/users', require('./controllers/users.js'));
// app.use('/users', require('./controllers/countries.js'));
app.use('/messages', require('./controllers/messages.js'));

//App Listen
//new listen to allow socket.io to share the port
server.listen(process.env.PORT || 3000);
//app.listen(process.env.PORT || 3000);



console.log("Server running on port 3000...");



function getCookie(reqHead, cooky) {
    if (reqHead.cookie.length > 0) {
      c_start = reqHead.cookie.indexOf(cooky + "=");
      if (c_start != -1) {
        c_start = c_start + cooky.length + 1;
        c_end = reqHead.cookie.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = reqHead.cookie.length;
        }
        return decodeURI(reqHead.cookie.substring(c_start, c_end));
      }
    }
    return "";
}
