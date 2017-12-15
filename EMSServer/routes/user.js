var express = require('express');
var router = express.Router();
var CTString = require('../util/CTString')
var jwt = require('jsonwebtoken')

router.all('/*', function(req, res, next) {
  if (req.path === '/login' ||
      req.path === '/register') {
    return next()
  }
  const errInfo = {
    code: 401,
    errNo: ErrNo.userTokenInvalid
  }
  if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ')[1]
    let decoded = jwt.decode(token)
    if (token && decoded && decoded.rf === 0 && decoded.exp > Date.now() / 1000) {
      req.userManager.authToken(decoded.un, token)
        .then(err => {
          if (err === ErrNo.success) {
            req.userName = decoded.un
            next()
            return
          }
          return res.json(errInfo)
        })
      return
    }
  }
  return res.json(errInfo)
})

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({ errNo: ErrNo.success })
});

router.all('/*', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next()
})

/* User login */
router.post('/login', function(req, res, next) {
  req.userManager.auth(req.body.userName, req.body.password)
    .then(result => {
      if (result !== ErrNo.success) {
        return Promise.reject(result)
      }
      return req.userManager.updateToken(req.body.userName)
    })
    .then(result => {
      if(!result.success) {
        return Promise.reject(ErrNo.serverError)
      }
      res.send(CTString.toString({
        errNo: ErrNo.success,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      }));
    })
    .catch(err => {
      res.send(CTString.toString({ errNo: err, errInfo: '登录失败' }))      
    })

});

/* User register */
router.post('/register', function(req, res, next) {
  var user = req.body
  req.userManager.addUser(req.body)
  .then(user => {
    res.send(CTString.toString({errNo:ErrNo.success}));    
  })
  .catch(error => {
    res.send(CTString.toString({errNo:error,errInfo:'用户已存在'}));        
  })
});

/* User register */
router.post('/delUser', function(req, res, next) {
  req.userManager.delUser(req.body.userName)
  .then(user => {
    res.send(CTString.toString({errNo:ErrNo.success}));    
  })
});

/* User check */
router.post('/check', function(req, res, next) {
  req.userManager.checkExist(req.body.userName)
  .then(exist => {
    res.send(CTString.toString({errNo:ErrNo.success, exist:exist}));    
  })
});

/* User logout */
router.post('/logout', function(req, res, next) {
  res.send('respond with a resource,logout');
});

/* User logout */
router.post('/refreshToken', function(req, res, next) {
  req.userManager.updateToken(req.userName)
    .then(result => {
      if (!result.success) {
        return Promise.reject(ErrNo.serverError)
      }
      res.send(CTString.toString({
        errNo: ErrNo.success,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      }));
    })
    .catch(err => {
      res.send(CTString.toString({ errNo: err, errInfo: '登录失败' }))
    })
});

module.exports = router;
