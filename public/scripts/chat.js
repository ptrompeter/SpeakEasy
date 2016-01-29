
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

  var chat = {}

  chat.sendMessage = function(e) {

  msg = $('#myMsg').val().trim();

  if(msg.length > 0) {
      var completeMsg = msg;
      console.log(completeMsg);
      socket.emit('msg', completeMsg);
    }
  };

  chat.date = date.toLocaleTimeString("en-us", options);


      // console.log(to);

  $('#sendBtn').on('click', function(e) {
        e.preventDefault()
        chat.sendMessage();
  });



  socket.on('connect', function () {
    socket.emit('room', room);
  });


  socket.on('msg', function(incomingMsg) {
      decoratedHtml = '<p class="msgfield"><b>'+userName + ':</b> '+ incomingMsg +'&nbsp;&nbsp;&nbsp;&nbsp;<small>'+chat.date+'</small></p>';
      $('#chatsContainer').append(decoratedHtml);
  });

  $('#hamMenu').on('click', function() {
      $('nav').slideToggle();
   }); 
});
