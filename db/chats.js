// файл базы чатов. добавить методы поиска сюда? или в модель?
var chats = {
  "123" : {
    uuid: "123",
    name: "first"
  }
}
var Chats = {
  get_by_uuid: function(uuid) {
    return chats[uuid]
  }
}

module.exports = Chats
