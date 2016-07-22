var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/',	passport.authenticate('auth0', { failureRedirect: '/menu/categories' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
})

module.exports = router;