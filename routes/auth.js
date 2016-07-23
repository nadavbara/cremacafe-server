var express = require('express');
var router = express.Router();
var passport = require('passport');
var requiresLogin = require('../passport/requiresLogin');

router.get('/',	passport.authenticate('auth0', { failureRedirect: '/' }), requiresLogin,
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.send(req.user);
});

module.exports = router;