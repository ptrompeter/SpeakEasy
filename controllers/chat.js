var express = require('express');

// // var http = require('http');
// var socketIO = require('socket.io');
var router = express.Router();
// // var http = require('http');
var app = express();
//var server = app.listen(3000);
var io = require('socket.io');
var request = require('request');
var passport = require('passport');
var db = require('../models');
//
// router.get('/chat', function(req,res){
//   res.render('views/chat.ejs')
// });

// app.use(express.static(__dirname + '/views'));
//
// // httpServer.listen(process.env.PORT || , function() {
// //     console.log('Server listening at ' + (process.env.PORT || 9090));
// // });
//

// db.user.find({where: {userName: req.body.pal}}).then(function(pal){
//   console.log(pal);
// });

router.get('/chat', function(req,res){
  // console.log('name: '+req.user.userName+'language: '+req.user.language);
  // console.log(req);
  // console.log(req.user.language);
  res.render('chat/chat.ejs');
  console.log(io);
  io.on('connection', function(socket) {
      console.log('new connection made, id=' + socket.id);
  res.render(req);
        socket.on('msg', function(incomingMsg) {
            io.emit('msg', incomingMsg);
        });
  });

});

router.post('/chat/api', function(req,res){
  // console.log('listening to chat/api');

    // console.log('new connection made, id=' + socket.id);
    // io.on('connection', function(socket) {
    //     console.log('new connection made, id=' + socket.id);
    // res.render(req);
    //       socket.on('msg', function(incomingMsg) {
    //           io.emit('msg', incomingMsg);
    //       });
    // });
  // db.user.find({where: {userName: req.body.pal}}).then(function(pal){
  //   var apiKey = 'key='+process.env.SPEAKEASY_KEY+'&';
  //
  //   var from = req.user.language; //source of language//
  //   var to = 'ar'; //translating language//
  //   var url = 'https://www.googleapis.com/language/translate/v2?q=';
  //   var input = req.body.thebody; // grab text from new msg post and use it in query for api//
  //   var translations;
  // //api http request to googleapi//
  // console.log(from+" 1");
  //  request(url+input+'&source='+from+'&target='+to+'&'+apiKey, function (error, response, body) {
  //    //console.log("4 user: "+req.user.language+" pal: "+pal.language);
  //    console.log(from+" 2");
  //      if (!error && response.statusCode == 200) {
  //          var data =JSON.parse(body);
  //          translations = data.data.translations[0].translatedText;
  //          console.log(translations+' chat.js');
  //      }
  //  });
  //
  //   //console.log(pal.language);
  //   console.log(req.body.thebody);
  //   console.log(req.user.language+" 3");
  //   console.log(req.user.userName);
  // });
});
// console.log('new connection made, id=' + socket.id);
// io.on('connection', function(socket) {
//     console.log('new connection made, id=' + socket.id);
// res.render(req);
//       socket.on('msg', function(incomingMsg) {
//           io.emit('msg', incomingMsg);
//       });
// });


// Export


 module.exports = router;
