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
  // Post Login
  res.send('this will login.')
});

// Log out
router.post('/logout', function(req,res){
  // Post Login
  res.send('this will logout.')
});

// Export

module.exports = router;
