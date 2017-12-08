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
        if(!user) {
            return ErrNo.userNotExist
        }
        if(user.password === password) {
            return ErrNo.success
        }
        return ErrNo.userInvalidPWD
    })
}

UserManager.prototype.addUser = function addUser(user) {
    if(user.password === undefined || 
       user.userName === undefined) {
        return Promise.reject(ErrNo.invalidParm)
    }
    return this.checkExist(user.userName).then(exist => {
        if(exist) {
            return Promise.reject(ErrNo.userNotExist)
        }
        return this.dbManager.addUser(user)
    })
}

UserManager.prototype.delUser = function delUser(userName) {
    return this.dbManager.delUser(userName)
}
    
