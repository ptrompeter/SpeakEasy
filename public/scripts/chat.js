$(function(){
    var socket = io();
    // console.log(socket);
    var decoratedHtml;
    var input;
    var interpetedText;
    var bi;
    var $user;
    var $msg;


    var apiKey = 'key='+process.env.SPEAKEASY_KEY+'&';
    console.log(apiKey);
    var from = 'en';
    var to = 'ar';
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
    language();
    // console.log(to);
    var translateText = function() {
      $.ajax({
        url: url+input+'&source='+from+'&target='+to+'&'+apiKey,
        type: 'GET',
        //headers: { 'Authorization': 'token ' + githubToken },
        success: function(data, message, xhr) {
              interpetedText = data.data.translations[0].translatedText
              decoratedHtml = '<p class="msgfield">'+ $user +' '+ interpetedText + '</p>';
              $('#chatsContainer').append(decoratedHtml);
        }
      });
    };

    $('#sendBtn').on('click', function() {
        var msg = $('#myMsg').val().trim();

        if(msg.length > 0) {
            var userName = $('#username').val();
            var completeMsg = userName + ': ' + msg;

            socket.emit('msg', completeMsg);
        }
    });

    socket.on('msg', function(incomingMsg) {
        bi = incomingMsg.indexOf(':');
        $user = incomingMsg.slice(0, bi+1);
        $msg = incomingMsg.slice(bi+1).trim();
        input=encodeURIComponent($msg);
        translateText();

    });


});
