
module.exports.init = function() {
  if ( !String.prototype.contains ) {
    String.prototype.contains = function() {
      return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
  }
}
