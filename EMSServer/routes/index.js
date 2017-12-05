var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile('index.html', {root: path.join(__dirname, '../frontend/dist')});
});

router.get('/userlist',function(req, res) {
  var dbManager = req.dbManager;
  dbManager.userList(function(e,docs) {
    res.render('userlist', {
      'userlist': docs
    });
  });
});

router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User'});
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
  // Set our internal DB variable
  var dbManager = req.dbManager;
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  dbManager.addUser(userName, userEmail, function(err,docs) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("userlist");
    }
  })
});

module.exports = router;
