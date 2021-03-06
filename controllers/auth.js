var express = require('express');
var passport = require('passport');
var db = require('../models');
var router = express.Router();

// Routes

router.get('/signup', function(req,res){
  res.render('users/signup');
});

router.post('/signup',function(req,res){
 if(req.body.password != req.body.password2){
   req.flash('danger','Passwords must match.')
   res.redirect('/auth/signup');
 }else{
   db.user.findOrCreate({
     where:{
       userName: req.body.username
     },
     defaults:{
       password: req.body.password,
       language: req.body.language,
       palRecipient: req.body.palRecipient,
       matchWaiting: false
     }
   }).spread(function(user,created){
     if(created){
       req.flash('success','You are signed up.');
       req.login(user,function(error){
         if(error) throw error;
       });
       res.redirect('/users/settings');
     }else{
       req.flash('danger','A user with that username already exists.');
       res.redirect('/auth/signup');
     }
   }).catch(function(err){
     if(err.message){
       req.flash('danger',err.message);
     }else{
       req.flash('danger','unknown error.');
      //  console.log(err);
     }
     res.redirect('/auth/signup');
   })
 }
});
// Go to Login Page
router.get('/login', function(req,res){
  res.render('users/login');
});

// Logging In - creating session
router.post('/login', function(req,res){
  passport.authenticate('local', function(error,user,info){
    // console.log(user);
    if(user){
      req.login(user,function(error){
        if(error) throw error;
        req.flash('Sucess', 'You are now logged in.');
        res.redirect('/users/')
      });
    } else {
      req.flash('Error', 'Sorry, login failed. If you are a new user, please create an account.');
      res.redirect('/auth/signup');
    }
  })(req,res);
});

// Log out
router.get('/logout', function(req,res){
  req.logout();
  req.flash('Info', 'You have been logged out.');
  res.redirect('/');
});

// Export

module.exports = router;
