var jwt = require('jsonwebtoken')

const tokenExp = 60 * 0.3

var createToken = function (name,forRefresh) {
  const token = jwt.sign({
          un: name,
          rf: forRefresh ? 1 : 0
      },
      'CTUserTokenSecret', {
          expiresIn: forRefresh ? '1h': tokenExp // 测试时长
      });

  return token;
}

var UserManager = module.exports = function UserManager(dbManager) {
  this.dbManager = dbManager;
  if (!(this instanceof UserManager)) {
    return new UserManager(dbManager);
  }
  var mid = function (req, res, next) {
    req.userManager = this;
    next();
  };
  return mid.bind(this);
}

UserManager.prototype.checkExist = function checkExist(userName) {
  return this.dbManager.user(userName).then(user => {
    if (user) {
      return true
    }
    return false
  })
}

UserManager.prototype.auth = function auth(userName, password) {
  return this.dbManager.user(userName).then(user => {
    if (!user) {
      return ErrNo.userNotExist
    }
    if (user.password === password) {
      return ErrNo.success
    }
    return ErrNo.userInvalidPWD
  })
}

UserManager.prototype.authToken = function authToken(userName, token) {
  return this.dbManager.user(userName).then(user => {
    if (!user) {
      return ErrNo.userNotExist
    }
    if (user.accessToken === token) {
      return ErrNo.success
    }
    return ErrNo.userInvalidPWD
  })
}

UserManager.prototype.addUser = function addUser(user) {
  if (user.password === undefined ||
    user.userName === undefined) {
    return Promise.reject(ErrNo.invalidParm)
  }
  return this.checkExist(user.userName).then(exist => {
    if (exist) {
      return Promise.reject(ErrNo.userNotExist)
    }
    return this.dbManager.addUser(user)
  })
}

UserManager.prototype.updateToken = function updateToken(userName) {
  if (userName === undefined) {
    return Promise.reject(ErrNo.invalidParm)
  }
  const accessToken = createToken(userName, false)
  const refreshToken = createToken(userName, true)
  var user = {
    userName: userName,
    accessToken: accessToken,
    refreshToken: refreshToken,
    exp: tokenExp
  }
  return this.dbManager.updateUser(user).then(res => {
    user.success = res
    return user
  })
}

UserManager.prototype.delUser = function delUser(userName) {
  return this.dbManager.delUser(userName)
}

