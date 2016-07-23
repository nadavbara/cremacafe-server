var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'cremacafe.auth0.com',
    clientID:     'EgY7ZjhvdKrGc3r7X5k6DSXwZpczJIKL',
    clientSecret: 'oijBHgmDtIME_UNusj0J_R9Tj1H_qXwKGtBG_EyO0JSU5xkjsN6WJMauBnTWForm',
    callbackURL:  'https://cremacafe.herokuapp.com/auth'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);

});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;