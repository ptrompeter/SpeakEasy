var express = require('express');
var db = require('../models');
var router = express.Router();
var request = require('request');








// Routes

//Directs to message form
router.get('/new', function(req,res){
  console.log(res.b+' here 1');
  res.render('messages/new.ejs')
});

//Sending form data to DB

// Send New Message Route



router.post('/new', function (req,res){

//Variables for googleapis//
  var apiKey = 'key=AIzaSyCCq7pSGvCgu5tcDJezGo82QIBe7R8hCX8&';
  var from = 'en'; //source of language//
  var to = 'ar'; //transating language//
  var url = 'https://www.googleapis.com/language/translate/v2?q=';
  var input = req.body.text; // grab text from new msg post and use it in query for api//
  var translations;
//api http request to googleapi//
 request(url+input+'&source='+from+'&target='+to+'&'+apiKey, function (error, response, body) {
     if (!error && response.statusCode == 200) {
         var data =JSON.parse(body);
         translations = data.data.translations[0].translatedText;

     }
 }).on('response', function(response) {
     db.user.find({where: {userName: req.body.pal}}).then(function(pal){
       db.message.create({
         body: req.body.text,
         translation: translations,
         userId: req.user.id,
         palId: pal.id,
         userName: req.user.userName,
         palName: pal.userName
       }).then(function(message){

         res.send(message);
       });
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
   res.render('messages/received.ejs', {messages: messages});
 });
});

// Export

module.exports = router;
