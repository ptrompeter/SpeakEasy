$(window).load(function() {
  var socket = io();
  var decoratedHtml;
  var input;
  var interpetedText;
  var bi;
  var $user;
  var $msg;
  var room = 'abc123';


  var apiKey = $('#hide').text();
  console.log(apiKey);
  $('#hide').remove();
  var from = 'en';
  var to = $('#to').text();
  var url = 'https://www.googleapis.com/language/translate/v2?q=';

  var language = function() {
      var answer = prompt("Pick a language Hebrew, Spanish, Arabic");
      if(answer.toLowerCase() == 'hebrew') {
          to = 'iw';
      } else if(answer.toLowerCase() == 'spanish') {
            to = 'es';
      } else {
          to = 'ar';
      }
  }
  //language();


  var date = new Date(Date.UTC(2013, 1, 1, 14, 0, 0));
  var options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
  };
  var d = date.toLocaleTimeString("en-us", options);
  console.log(d);
  var translateText = function() {
    $.ajax({
      url: url+input+'&source='+from+'&target='+to+'&'+apiKey,
      type: 'GET',
      //headers: { 'Authorization': 'token ' + githubToken },
      success: function(data, message, xhr) {
            interpetedText = data.data.translations[0].translatedText
            decoratedHtml = '<p class="msgfield"><b>'+ $user +'</b> '+ interpetedText +'&nbsp;&nbsp;&nbsp;&nbsp;<small>'+d+'</small></p>';
            $('#chatsContainer').append(decoratedHtml);
      }
    });
  };

  socket.on('connect', function () {
    socket.emit('room', room);
  });


  $('#sendBtn').on('click', function(e) {
      //e.preventDefault();
      var completeMsg = $('#myMsg').val().trim();

      if(completeMsg.length > 0) {
          //var userName = $('#username').val();

          //var completeMsg = userName + ': ' + msg;
          console.log('cllient before: ' +completeMsg);
          socket.emit('msg', completeMsg);
      }
  });

  socket.on('msg', function(incomingMsg) {
      // bi = incomingMsg.indexOf(':');
      // $user = incomingMsg.slice(0, bi+1);
      // $msg = incomingMsg.slice(bi+1).trim();
      // input=encodeURIComponent($msg);
      //translateText();
      console.log('cllient after: ' +incomingMsg);
      decoratedHtml = '<p class="msgfield">'+incomingMsg +'&nbsp;&nbsp;&nbsp;&nbsp;<small>'+d+'</small></p>';
      $('#chatsContainer').append(decoratedHtml);

  });


});
