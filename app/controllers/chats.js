var settings = require('../../settings')
  , Chats = require('../../db/chats')
  , node_uuid = require('node-uuid')
  , routes = require('../../routes');
module.exports = {
  index: function(req, res) {
    res.render('chats/index', { title: 'Chats', chats: Chats.all() });
  },
  show: function(req, res) {
    var chat = Chats.getByUuid(req.params.uuid);
    if (chat) {
      res.render('chats/show', { title: 'Chat - ' + chat.name, name: chat.name });
    } else {
      res.redirect('/chats')
    }
  },
  create: function(req, res) {
    var params = req.body;
    var uuid = node_uuid.v4()
    if (Chats.new(uuid, params["roomname"])) {
      req.flash('success', 'Welcome to chat room!');
      routes.chat_listen(uuid);
      res.redirect('/chats/' + uuid)
    } else {
      req.flash('error', Chats.errors);
      res.redirect('/chats')
    }
  },
  destroy: function(uuid, chatSocket) {
    Chats.removeBy(uuid);
    delete chatSocket;
  },
  message: function(uuid, mess, socket, chatSocket) {
    var chat = Chats.getByUuid(uuid);
    if (chat) {
      socket.get('nickname', function(err, name) {
        if (name) {
          var data = {nickname: name, message: mess};
          chat.pushToHistory(data);
          chatSocket.emit('message', data);
        } else {
          socket.emit('server message', {message: 'Please set nickname!'});
        }
      });
    }
  },
  new_user: function(uuid, nickname, socket, chatSocket) {
    var chat = Chats.getByUuid(uuid);
    if (chat) {
      if (chat.addUser(nickname)) {
        socket.set('nickname', nickname, function () {
          socket.emit('ready');
          socket.emit('history', chat.history);
          socket.emit('users', chat.users);
          chatSocket.emit('server message', {message: 'User ' + nickname + ' joins to chat'});
          socket.broadcast.emit('new user', {nickname: nickname});
        });
      } else {
        socket.emit('server message', {message: 'Nickname is busy.'});
      }
    }
    // TODO оповещать если чата нет
  },
  leave_chat: function(uuid, socket, chatSocket) {
    var self = this;
    socket.get('nickname', function(err, name) {
      var chat = Chats.getByUuid(uuid);
      if (chat) {
        chat.deleteUser(name);
        if (chat.usersCount() == 0) {
          self.destroy(uuid, chatSocket);
        } else {
          if (name) {
            chatSocket.emit('server message', {message: 'User ' + name + ' has left the chat'});
            socket.broadcast.emit('leave user', {nickname: name});
          }
        }
      }
    });
  }
}
