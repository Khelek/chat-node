var Chat = require('../app/models/chat');
// chats = {uuid: Chat}
var chats = {}
var Chats = {
  errors: "",
  all: function() {
    return this.limit(-1);
  },
  limit: function(limit) {
    var arr = [];
    for( var i in chats ) {
      if (limit == 0) break;
      if (chats.hasOwnProperty(i)){
        arr.push(chats[i]);
        limit--;
      }
    }
    return arr;
  },
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
      console.log(chats);
      return true
    }
  }
}

module.exports = Chats
