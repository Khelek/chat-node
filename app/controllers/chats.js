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
      res.cookie('nickname', params["nickname"], { maxAge: 900000, httpOnly: false});
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
  destroy: function(uuid) {
  },
  message: function(uuid, mess, socket, chat) {
    console.log(mess)
    socket.get('nickname', function(err, name) {
      console.log(name)
      // если ника нет, то не оправлять
      var data = {nickname: name, message: mess};
      chat.emit('message', data);
    });
  },
  new_user: function(uuid, nickname, socket, chatSocket) {
    // TODO находить чат по uuid и проверять его на существование
    // и добавлять туда пользователя
    var chat = Chats.getByUuid();
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
    socket.get('nickname', function(err, name) {
      // TODO найти пользователя в чате и удалить его оттуда,
      // если это последний пользователь - завершить чат(destroy)
      var chat = Chats.getByUuid();
      console.log("delete");
      if (chat) {
        chat.deleteUser(name);
        console.log("delete1");
        if (chat.usersCount == 0) {
          console.log("delete2");
          Chats.remove(uuid);
          chatSocket.close();
          console.log("delete3");
        }
      }
      chatSocket.emit('server message', {message: 'User ' + name + ' has left the chat'});
    })
  }
}
