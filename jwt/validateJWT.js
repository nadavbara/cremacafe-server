var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('oijBHgmDtIME_UNusj0J_R9Tj1H_qXwKGtBG_EyO0JSU5xkjsN6WJMauBnTWForm', 'base64'),
  audience: 'EgY7ZjhvdKrGc3r7X5k6DSXwZpczJIKL'
});

module.exports = jwtCheck;