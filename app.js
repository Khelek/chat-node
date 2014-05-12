var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , multer  = require('multer')
  , flash = require('express-flash')
  , port = process.env.PORT || 8085;

server.listen(port);

console.log("server listen on " + port);


app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

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

module.exports.app = app
module.exports.io = io
