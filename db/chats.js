var Chat = require('../app/models/chat');
// chats = {uuid: Chat}
var chats = {}
var Chats = {
  get_by_uuid: function(uuid) {
    return chats[uuid]
  },
  new: function(chat_uuid, chat_name, username) {
    if (chats[chat_uuid] || !chat_uuid || !chat_name || !username) {
      return false
    } else {
      chats[chat_uuid] = new Chat(chat_uuid, chat_name)
      chats[chat_uuid].addUser(username) 
      return true
    }
  }
}

module.exports = Chats
