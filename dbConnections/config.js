
var mlab_key = process.env.MLAB_KEY;
var mlab_pass = process.env.MLAB_PASSWORD;
var admin_pass = process.env.ADMIN_PASS
var twilio = {
	key: process.env.TWILIO_ACCOUNT_SID,
	secret: process.env.TWILIO_AUTH_TOKEN
}

var url = 'mongodb://'+mlab_key+':'+mlab_pass+'@ds011715.mlab.com:11715/crema_test_db';

module.exports = {url:url,admin_pass:admin_pass, twilio:twilio};