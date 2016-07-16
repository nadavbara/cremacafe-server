
var mlab_key = process.env.MLAB_KEY || 'baza';
var mlab_pass = process.env.MLAB_PASSWORD || 'bgu4life';

var url = 'mongodb://'+mlab_key+':'+mlab_pass+'@ds011715.mlab.com:11715/crema_test_db';

module.exports = url;