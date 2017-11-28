var mongo = require('mongodb');
var monk = require('monk');

var DBManager = module.exports = function DBManager(path) {
  if (!(this instanceof DBManager)) {
    return new DBManager(path);
  }
  this.db = monk(path);
  var mid = function (req, res, next) {
    req.dbManager = this;
    next();
  };
  return mid.bind(this);
};

DBManager.prototype.userList = function userList(callback) {
  var collection = this.db.get('usercollection');
  collection.find({}, {}, callback);
}


// DBManager.prototype.addUser = function addUser(userName, userEmail, callback) {
//   var collection = this.db.get('usercollection');
//   collection.insert({
//     "username": userName,
//     "email": userEmail
//   }, callback);
// }
