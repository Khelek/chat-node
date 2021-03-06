/* global io:true*/
$(function() {
  //FIXME странно выглядит sendMessage без message в аргументах
  function  sendMessage() {
    socket.emit("message", $("#message-input").val());
    $("#message-input").val("");
  }

  function isKeyEnter(e) {
    return e.which == 13;
  }

  function addMessage(nickname, message) {
    var message = ["<span><strong>", nickname, "</strong> ",
                   message, "</span><br>"].join(" ");
    var $chatText = $("#chat-text");
    $chatText.append(message);
    $chatText.scrollTop($chatText[0].scrollHeight);
  }

  function addUser(nickname) {
    var user = ["<strong class = 'user_", nickname, "'>",
                nickname, "<br></strong>"].join("");
    $("#chat-users").append(user);
  }

  function deleteUser(nickname) {
    $(".user_" + nickname).remove();
  }
  
  if (document.getElementById('chat-show')) {
    $('#nicknameModal').modal();
    var socket = io.connect(window.location.pathname);
    $( ".set-nickname" ).click(function() {
      // TODO мб вынести в функции
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
    
    socket.on('ready', console.log("ready")); // FIXME сделать до этого поле disabled
    socket.on('message', function(data) {
      addMessage(data.nickname, data.message);
    });
    
    socket.on('server message', function(data) {
      addMessage(data.message);
    });

    socket.on('history', function(history) {
      for (var i = 0; i < history.length; i++) {
        addMessage(history[i][0], history[i][1]);
      }      
    });

    socket.on('users', function(users) {
      for (var i = 0; i < users.length; i++) {
        addUser(users[i]);
      }
    });

    socket.on('new user', function(user) {
      addUser(user.nickname);
    });

    socket.on('leave user', function(user) {
      deleteUser(user.nickname);
    });
    
  }
});
