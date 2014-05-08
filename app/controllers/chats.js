var settings = require('../../settings')
  , Chats = require('../../db/chats')
  , node_uuid = require('node-uuid')
module.exports = {
  index: function(req, res) {
    res.render('chats/index', { title: 'Chats', chats: Chats.all() });
  },
  show: function(req, res) {
    var chat = Chats.get_by_uuid(req.params.uuid);
    if (chat) {
      console.log(Chats.get_by_uuid(req.params.uuid).name);
      res.render('chats/show', { title: 'Chat - ' + chat.name, name: chat.name });
    } else {
      res.redirect('/chats')
    }
  },
  new: function(req, res) {
    res.render('chats/new', { title: 'New chat' });
  },
  create: function(req, res) {
    var params = req.body;
    var uuid = node_uuid.v4()
    if (Chats.new(uuid, params["roomname"], params["nickname"])) {
      console.log(Chats.get_by_uuid(uuid).name)
      req.flash('success', 'Welcome to chat room!');
      res.redirect('/chats/' + uuid)
    } else {
      req.flash('error', Chats.errors);
      res.redirect('/chats')
    }
  },
  destroy: function(uuid) {
  },
  message: function(uuid, nick, mess, chat) {
    socket.get('nickname', function(err, name) {
      // если ника нет, то не оправлять
      var data = {};
      data.everyone = 'in';
      //data['/chat/ + uuid'] = {nickname: nick, message: mess};
      chat.emit('message', data);
    });
  },
  new_user: function(uuid, nickname, socket) {
    // TODO находить чат по uuid и проверять его на существование
    // и добавлять туда пользователя
    socket.set('nickname', nickname, function () {
      socket.emit('ready');
    });
  },
  leave_chat: function(uuid, socket) {
    socket.get('nickname', function(err, name) {
      // TODO найти пользователя в чате и удалить его оттуда,
      // если это последний пользователь - завершить чат(destroy)
    })
  }
}
