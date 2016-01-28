// var express = require('express');
// // var http = require('http');
// var socketIO = require('socket.io');
// // var router = express.Router();
// // var http = require('http');
// var app = express();
// // var httpServer = http.createServer(app);
// var io = socketIO.listen(httpServer);
// var server    = app.listen(3000);
// var io        = require('socket.io').listen(server);
//
// router.get('/chat', function(req,res){
//   res.render('views/chat.ejs')
// });
//
// app.use(express.static(__dirname + '/views'));
//
// // httpServer.listen(process.env.PORT || , function() {
// //     console.log('Server listening at ' + (process.env.PORT || 9090));
// // });
//
// io.on('connection', function(socket) {
//     console.log('new connection made, id=' + socket.id);
//
//       socket.on('msg', function(incomingMsg) {
//           io.emit('msg', incomingMsg);
//       });
// });
//
//
// // Export
//
// module.exports = io;
