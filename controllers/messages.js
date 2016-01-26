var express = require('express');
var db = require('../models');
var router = express.Router();

// Routes

//Directs to message form
router.get('/new', function(req,res){
  res.render('messages/new.ejs')
});

//Sending form data to DB

// Send New Message Route

router.post('/new', function (req,res){
 db.user.find({where: {userName: req.body.pal}}).then(function(pal){
   db.message.create({
     body: req.body.text,
     translation: 'LATER - When API call is working.',
     userId: req.user.id,
     palId: pal.id,
     userName: req.user.userName,
     palName: pal.userName
   }).then(function(message){
     res.send(message);
   });
 });
});


// Get current user's sent messages
router.get('/sent', function(req,res){
 db.message.findAll({ where: {userId: req.user.id}}).then(function(messages){
   res.render('messages/sent.ejs', {messages: messages});
  //  res.send(messages);
 });
});


// Get current user's received messages
router.get('/received', function(req,res){
 db.message.findAll({ where: {palId: req.user.id}}).then(function(messages){
   res.render('messages/received.ejs', {currentUser: res});
 });
});

// Export

module.exports = router;
