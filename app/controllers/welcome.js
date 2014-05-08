var settings = require('../../settings')
module.exports = {
  index: function(req, res) {
    res.render('welcome/index', { title: 'Home' });
  }
}
