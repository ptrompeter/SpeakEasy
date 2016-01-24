var express = require('express');
var db = require('../models');
var router = express.Router();

// Routes

router.get('/signup', function(req,res){
  res.render('users/signup');
});

router.post('/signup', function(req,res){
 db.user.create({
   userName: 'testing2',
   firstName: 'testing2',
   lastName: 'testing2',
   language: 'testing2',
   nationality: 'testing2',
   gender: 1,
   birthday: null,
   palRecipient: false,
   lastLogin: null,
   password: 'testing2',
   lastRequest: null,
   matchWaiting: false,
   email: 'testing2'
 }).then(function(user){
   res.send(user);
 })
});
// Export

module.exports = router;
