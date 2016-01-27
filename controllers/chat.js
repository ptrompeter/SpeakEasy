// var express = require('express');
// var http = require('http');
// var socketIO = require('socket.io');
// var router = express.Router();
//
// var app = express();
// var httpServer = http.createServer(app);
// var io = socketIO.listen(httpServer);
//
// app.use(express.static(__dirname + '/public'));
//
// httpServer.listen(process.env.PORT || 9090, function() {
//     console.log('Server listening at ' + (process.env.PORT || 9090));
// });
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
// module.exports = router;
