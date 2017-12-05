var mongo = require('mongodb');
var monk = require('monk');

var DBManager = module.exports = function DBManager(path) {
  if (!(this instanceof DBManager)) {
    return new DBManager(path);
  }
  var db = monk(path);
  this.userCollection = db.get('user');  
  var mid = function (req, res, next) {
    req.dbManager = this;
    next();
  };
  return mid.bind(this);
};

/**
 * Shema user
 * {
 *  userName: String, unique,index
 *  nickName: String,
 *  password: String,
 *  userEmail: String,  unique,index
 *  phoneNumber: String, unique,index
 * }
 * 
 * Shema contact
 * Shema group
 * 
 */

DBManager.prototype.userList = function userList(callback) {
  this.userCollection.find({}, {}, callback);
}


DBManager.prototype.addUser = function addUser(userName, userEmail, callback) {
  this.userCollection.insert({
    "username": userName,
    "email": userEmail
  }, callback);
}

//authentication
//register
//logout
