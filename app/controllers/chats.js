var settings = require('../../settings')
  , Chats = require('../../db/chats')
  , node_uuid = require('node-uuid')
  , io = require('../../app').io
module.exports = {
  index: function(req, res) {
    res.sendfile(settings.PROJECT_DIR + '/app/views/index.html');
  },
  show: function(req, res) {
    if (Chats.get_by_uuid(req.params.uuid)) {
      console.log(Chats.get_by_uuid(req.params.uuid).name);
      res.sendfile(settings.PROJECT_DIR + '/app/views/index.html');
    } else {
      res.redirect('/chats')
    }
  },
  new: function(req, res) {
    var uuid = node_uuid.v4()
    if (Chats.new(uuid, req.param("name"), req.param("creator"))) {
      console.log(Chats.get_by_uuid(uuid).name)
      res.redirect('/chats/' + uuid)
    } else {
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
