var express = require('express');
var router = express.Router();
var requiresLogin = require('../passport/requiresLogin');

router.get('/',requiresLogin, function (req, res) {
  console.log('yeahhhhhhhh')
  res.send(req.user);
});

module.exports = router;