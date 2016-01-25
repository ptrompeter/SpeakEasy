var express = require('express');
var db = require('../models');
var router = express.Router();

// Routes

router.get('/signup', function(req,res){
  res.render('users/signup');
});

router.post('/signup', function(req,res){
 db.user.create({
   userName: req.body.username,
   password: req.body.password,
   language: req.body.language
 }).then(function(user){
   res.send(user);
 })
});
// Go to Login Page
router.get('/login', function(req,res){
  res.render('users/login');
});

// Logging In - creating session
router.post('/login', function(req,res){
  passport.authenticate('local', function(error,user,info){
    if(user){
      req.login(user,function(error){
        if(error) throw error;
        req.flash('Sucess', 'You are now logged in.');
        res.redirect('/')
      });
    } else {
      req.flash('Error', 'Sorry, please try again.');
      res.redirect('/auth/login');
    }
  })(req,res);
});

// Log out
router.post('/logout', function(req,res){
  req.logout();
  req.flash('Info', 'You have been logged out.');
  res.redirect('/');
});

// Export

module.exports = router;
