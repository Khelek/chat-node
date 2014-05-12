var settings = require('../../settings')
  , Chats = require('../../db/chats')
  , node_uuid = require('node-uuid')
  , routes = require('../../routes')
  , io = require('../../app').io;
module.exports = {
  index: function(req, res) {
    res.render('chats/index', { title: 'Chats', chats: Chats.all() });
  },
  show: function(req, res) {
    var chat = Chats.getByUuid(req.params.uuid);
    if (chat) {
      console.log(Chats.getByUuid(req.params.uuid).name);
      res.render('chats/show', { title: 'Chat - ' + chat.name, name: chat.name });
    } else {
      res.redirect('/chats')
    }
  },
  create: function(req, res) {
    var params = req.body;
    var uuid = node_uuid.v4()
    if (Chats.new(uuid, params["roomname"])) {
      console.log(Chats.getByUuid(uuid).name)
      req.flash('success', 'Welcome to chat room!');
      console.log(io);
      // FIXME чтото не инклюдится в верхней части модуля. Из-за замыкания?
      // Или изза того, что объект, и создается он потом? А почему
      // тогда Chats работает?
      io = require('../../app').io
      // TODO перевести все на встроенные в socket.io rooms
      routes.chat_listen(io, uuid);
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
    console.log(mess)
    socket.get('nickname', function(err, name) {
      if (name) {
        var data = {nickname: name, message: mess};
        chat.emit('message', data);
      } else {
        chatSocket.emit('server message', 'Please set nickname!');
      }
    });
  },
  new_user: function(uuid, nickname, socket, chatSocket) {
    var chat = Chats.getByUuid(uuid);
    if (chat) {
      if (chat.addUser(nickname)) {
        socket.set('nickname', nickname, function () {
          socket.emit('ready');
          chatSocket.emit('server message', {message: 'User ' + nickname + ' joins to chat'});
        });
      }
      // TODO оповещать что ник занят
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
          chatSocket.emit('server message', {message: 'User ' + name + ' has left the chat'});
        }
      }
    });
  }
}
