var welcome = require('./app/controllers/welcome')
  , chats = require('./app/controllers/chats');

module.exports.initialize = function(app) {
  app.get('/', welcome.index);
  app.get('/chats', chats.index);
  app.get('/chats/:uuid', chats.show);
}
