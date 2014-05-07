var settings = require('../../settings')
module.exports = {
  index: function(req, res) {
    res.sendfile(settings.PROJECT_DIR + '/app/views/index.html');
  }
}
