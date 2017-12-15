var mongo = require('mongodb');
var monk = require('monk');

var DBManager = module.exports = function DBManager(path) {
  if (!(this instanceof DBManager)) {
    return new DBManager(path);
  }
  var db = monk(path);
  this.userCollection = db.get('user');  
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

DBManager.prototype.user = function user(name) {
  return this.userCollection.findOne({userName: name})
}

DBManager.prototype.addUser = function addUser(user) {
  return this.userCollection.insert({
    "userName": user.userName,
    "password": user.password,
  });
}

DBManager.prototype.updateUser = function updateUser(user) {
  return this.userCollection.update({ "userName": user.userName }, { $set: user })
    .then(res => {
      return res.ok === 1
    });
}

DBManager.prototype.delUser = function delUser(userName) {
  return this.userCollection.remove({
    "userName": userName,
  });
}

//authentication
//register
//logout
