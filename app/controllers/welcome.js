var settings = require('../../settings')
  , Chats = require('../../db/chats')
module.exports = {
  index: function(req, res) {
    var chats = Chats.limit(3);
    console.log(chats);
    res.render('welcome/index', { title: 'Home', chats: chats });
  }
}
