var express = require('express'),
    https = require('https');
    fs = require('fs');
	morgan = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    menu        = require('./routes/menu'),
    auth        = require('./routes/auth'),
    mongoose        = require('mongoose'),
    mongodb         = require('./dbConnections/mongoDbconnection')
    app = express();

var options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            this.ipaddress = "127.0.0.1";
};


//var url = 'mongodb://localhost:27017/crema_test_db';
var url = 'mongodb://baza:bgu4life@ds011715.mlab.com:11715/crema_test_db';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});



app.use('/menu', menu);
app.use('/auth',auth);


mongodb.connect(url,function(err){
    if(err){
        console.log("failed connecting to db: " + url);
        process.exit(1);
    }else{
        //app = express.createServer();
        /*https.createServer(options,app).listen(app.get('port'), function () {
            console.log('Express server listening on port ' + app.get('port'));*/
        app.listen(port, ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), ipaddress, port);
        });
    }
})

