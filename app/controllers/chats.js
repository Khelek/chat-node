var settings = require('../../settings')
  , Chats = require('../../db/chats')
  , node_uuid = require('node-uuid')
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
  message: function(uuid, user_id) {
  },
  new_user: function(uuid, nickname) {
  },
  leave_chat: function(uuid, user_id) {
  }
}
