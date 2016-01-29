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





// Chat connection and Code (Socket)
var rooms;
io.on('connection', function(socket) {

    console.log('new connection made, id=' + socket.id);
    socket.on('room', function(room) {
          rooms = room;
          console.log('Connected to room: '+rooms);
          socket.join(rooms);
      });

    socket.on('msg', function(incomingMsg) {
        io.to(rooms).emit('msg', incomingMsg);

    });
});




app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

//.uses for authentication
// console.log(process.env.HASH)
app.use(session({secret: process.env.HASH, resave: false, saveUninitialized: true}));
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
  db.usersPals.findAll({ where: {userId: req.user.id}}).then(function(preMyPals){
    db.user.findAll().then(function(pallist){
      var myPals = compareArrays(pallist, preMyPals, 'excl');
      console.log('');
      console.log('My Pals List: ');
      console.log(myPals);
      console.log('');
      var currDay = getCookie(req.headers, 'onceperday');
      onceperday =  (currDay !== '') ? true : false;
      if (req.user.matchWaiting === true) {
        db.user.findAll({ where: {userName: req.user.sentBy}})
        .then(function(newPal){
          res.render('users', {onceperday: onceperday, myPals: myPals, pending: true, newPal: newPal});
        });
      } else {
        res.render('users', {onceperday: onceperday, myPals: myPals});
      }
    });
  });
});


app.get('/chat', function(req, res) {
  //console.log(req+" "+res);
  res.render('chat');
});

function loginCheck(req, res) {
  if (typeof req.user === 'undefined'){
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



console.log("Server running on port 3000...");


//Resourceful Functions

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

var compareArrays = function(usersarray, palsarray, whatToReturn){
  var excl = [];
  var incl = [];
  var temp = palsarray.map(function(Pele, Pindex, Parray){
    var temp2 = usersarray.map(function(Aele, Aindex, Aarray){
      if (Pele.palId !== Aele.id) {
        if (typeof excl[0] === 'undefined') {
          if (incl.indexOf(Aele) === -1){
            incl.push(Aele);
          }
        } else {
          var exclmap = excl.map(function(Eele, Eindex, Earray){
            if (Eele.id !== Aele.id) {
              if (incl.indexOf(Aele) === -1){
                incl.push(Aele);
              }
            }
          });
        }
      } else {
        excl.push(Aele);
      }
    });
  });
  if (whatToReturn === 'incl'){
    return incl;
  } else { return excl; }
}
