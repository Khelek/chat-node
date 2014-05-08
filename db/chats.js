var Chat = require('../app/models/chat');
// chats = {uuid: Chat}
var chats = {}
var Chats = {
  errors: "",
  get_by_uuid: function(uuid) {
    return chats[uuid]
  },
  new: function(chat_uuid, chat_name, username) {
    this.errors = [];
    if (chats[chat_uuid] || !chat_uuid || !chat_name || !username) {
      if (chats[chat_uuid]){
        this.errors.push('Retry again');
      }
      if (!chat_uuid) {
        this.errors.push('Nothing uuid');
      }
      if (!chat_name) {
        this.errors.push('Missing chat name');
      }
      if (!username) {
        this.errors.push('Missing user name');
      }
      return false
    } else {
      chats[chat_uuid] = new Chat(chat_uuid, chat_name)
      chats[chat_uuid].addUser(username) 
      return true
    }
  }
}

module.exports = Chats
