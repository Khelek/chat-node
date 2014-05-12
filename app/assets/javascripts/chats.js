/* global io:true*/
$(function() {
  //FIXME странно выглядит sendMessage без message в аргументах
  function  sendMessage() {
    socket.emit("message", $("#message-input").val());
    $("#message-input").val("");
  }

  function isKeyEnter(e) {
    return e.which == 13
  }
  ///
  //alert(readCookie("nickname"))
  if (document.getElementById('chat-show')) {
    $('#nicknameModal').modal();
    var socket = io.connect(window.location.pathname);
    $( ".set-nickname" ).click(function() {
      // TODO вынести в функции
      socket.emit("new user", $("#modal-input-nickname").val());
    });
    $("#send-message").click(function() {
      sendMessage();
    });
    $("#message-input").keypress(function(e) {
      if(isKeyEnter(e)) {
        sendMessage();
      }
    });
    
    socket.on('ready', console.log("ready")); //сделать до этого поле disabled
    socket.on('message', function(data) {
      var message = ["<span><strong>", data.nickname, "</strong> ",
                    data.message, "</span><br>"].join(" ");
      $("#chat-text").append(message);
    });
    
    socket.on('server message', function(data) {
      var message = ["<span><strong>", data.message,
                     "</strong></span><br>"].join(" ");
      $("#chat-text").append(message);
    });
  }
});
