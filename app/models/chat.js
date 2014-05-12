// спецификация чата? методы? взаимодействие с базой?

var Chat = function(chat_uuid, chat_name) {
  this.uuid = chat_uuid
  this.name = chat_name
  this.users = []
}

Chat.prototype = {
  getUrl: function() {
    // TODO Может стоит подключить routes и создать в нем универсальный модуль
    return '/chats/' + this.uuid
  },
  userExist: function(username) {
    return this.users.indexOf(username) != -1
  },
  addUser: function(username) {
    if (this.users.indexOf(username) != -1) {
      return false
    } else {
      this.users.push(username)
      return true
    }
  },
  deleteUser: function(nickname) {
    var ax;
    while ((ax = this.users.indexOf(nickname)) !== -1) {
      this.users.splice(ax, 1);
    }
    return this.users; 
  },
  usersCount: function() {
    return this.users.length;
  }
}

module.exports = Chat;
