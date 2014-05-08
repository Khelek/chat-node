var welcome = require('./app/controllers/welcome')
  , chats = require('./app/controllers/chats');

module.exports.init = function(app) {
  app.get('/', welcome.index);
  app.get('/chats', chats.index);
  app.get('/chats/new', chats.new);
  app.get('/chats/:uuid', chats.show);
}

module.exports.chat_listen = function(io, uuid) {
  var chat = io.of('/chats/' + uuid)
    .on('connection', function(socket) {
      //FIXME change to socket.io associated data - username
      socket.on('new user', function(username) {
        chats.new_user(uuid, username, chat);
      });
      socket.on('message', function(message) {
        chats.message(uuid, message, chat);
      });
      socket.on('leave chat', function() {
        chats.leave_chat(uuid, socket);
      });
      socket.on('disconnect', function() {
        chats.leave_chat(uuid, socket);
      });
    });
}
