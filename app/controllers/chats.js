var settings = require('../../settings')
  , Chats = require('../../db/chats')
module.exports = {
  index: function(req, res) {
    res.sendfile(settings.PROJECT_DIR + '/app/views/index.html');
  },
  show: function(req, res) {
    //console.log(Chats.get_by_uuid(req.params.uuid).name);
    res.sendfile(settings.PROJECT_DIR + '/app/views/index.html');
  },
  new: function(name) {
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
