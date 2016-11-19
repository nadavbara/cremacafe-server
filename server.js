var express = require('express'),
	morgan = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    menu        = require('./routes/menu'),
    auth        = require('./routes/auth'),
    orders        = require('./routes/orders'),
    admin        = require('./routes/admin'),
    cookieParser = require('cookie-parser'),
    app = express();

app.set('port', (process.env.PORT || 5000));

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

app.use(cookieParser());
app.use('/menu', menu);
app.use('/auth',auth);
app.use('/orders',orders);
app.use('/admin',admin)



app.listen(app.get('port'), function() {
    console.log('%s: Node server started on %d ...',
                            Date(Date.now() ), app.get('port'));   
})

