var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8085);

console.log("server listen on " + 8085);

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

var routes = require('./routes')
  , polyfills = require('./polyfills');
routes.init(app, io);
polyfills.init();

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

exports.app = app
exports.io = io
