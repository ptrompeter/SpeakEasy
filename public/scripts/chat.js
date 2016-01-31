
$(window).load(function() {
  var socket = io();
  var decoratedHtml;
  var input;
  var room = 'abc123';
  
// chat object
  var chat = {}

// function to send messages to the server
chat.sendMessage = function(e) {
  var msg = $('#myMsg').val().trim();
  if(msg.length > 0) {
      var userName = $('#username').val();
      var completeMsg = userName + ': ' + msg;
      socket.emit('msg', completeMsg);
  }
};
// date and time stamp for messages
chat.date = new Date().toString().slice(0,24);



// when send btn is clicked sent to socket.io on server
  $('#sendBtn').on('click', function(e) {
        e.preventDefault()
        chat.sendMessage();
  });


// when connection is made to socket.io they are joined to a room
  socket.on('connect', function () {
    socket.emit('room', room);
  });

// when a message is sent to the client from the server
  socket.on('msg', function(incomingMsg) {
    decoratedHtml = '<p class="msgfield">'+incomingMsg+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>'+chat.date+'</i></p>';
    $('#chatsContainer').append(decoratedHtml);
  });

});   //end closure
