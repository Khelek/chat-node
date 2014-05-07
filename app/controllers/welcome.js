var settings = require('../../settings')
module.exports = {
  index: function(req, res) {
    console.log(settings.PROJECT_DIR + '/app/views/index.html');
    res.sendfile(settings.PROJECT_DIR + '/app/views/index.html');
  }
}
