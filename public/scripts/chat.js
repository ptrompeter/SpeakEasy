
$(window).load(function() {
  var socket = io();
  var decoratedHtml;
  var input;
  var msg;
  var room = 'abc123';
  var userName = $('#username').val();
  var date = new Date(Date.UTC(2013, 1, 1, 14, 0, 0));
  var options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
  };
// chat object
  var chat = {}

// function to send messages to the server
chat.sendMessage = function(e) {

  msg = $('#myMsg').val().trim();
  if(msg.length > 0) {
      var completeMsg = msg;
      console.log(completeMsg);
      socket.emit('msg', completeMsg);
    }
};
// date and time stamp for messages
chat.date = date.toLocaleTimeString("en-us", options);



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
      decoratedHtml = '<p class="msgfield"><b>'+userName + ':</b> '+ incomingMsg +'&nbsp;&nbsp;&nbsp;&nbsp;<small>'+chat.date+'</small></p>';
      $('#chatsContainer').append(decoratedHtml);
  });


  $('#hamMenu').on('click', function() {
      $('nav').slideToggle();
   });
});
