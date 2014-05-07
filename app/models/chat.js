// спецификация чата? методы? взаимодействие с базой?

var Chat = function(chat_uuid, chat_name) {
  this.uuid = chat_uuid
  this.name = chat_name
  this.users = []
}

Chat.prototype = {
  userExist: function(username) {
    chats[uuid].users.indexOf(username) != -1
  },
  addUser: function(username) {
    if (this.users.indexOf(username) != -1) {
      return false
    } else {
      this.users.push(username)
      return true
    }
  }
}

module.exports = Chat;
