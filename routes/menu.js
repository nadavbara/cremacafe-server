var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var dbConnection = require('../dbConnections/mongoDbconnection');
var twilio = require('twilio')('AC8da339595d406da3563966808fb98085','87386ced0c4b111b6731ee988f39997c')

router.get('/categories', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('categories');
    twilio.sendMessage({

    to: '+972508812305', // Any number Twilio can deliver to
    from: '+13158364481', // A number you bought from Twilio and can use for outbound communication
    body: 'ההזמנה שלך מוכנה בקרמה קפה' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    }

});
    collection.find().toArray(function (err, docs) {
        res.send(docs);
    })
});
/*
router.get('/categories/:category_id', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('categories');
    var id = req.params.category_id;
    var mongo_id = new mongo.ObjectID(id);
    var category = collection.findOne({_id:mongo_id}, function (err, category) {
        res.send(category);
    })

})*/

router.get('/categories/:category_name', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('categories');
    var name = req.params.category_name;
    var category = collection.findOne({categoryName:name}, function (err, category) {
        res.send(category);
    })

})

router.get('/categories/:category_id/products', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('products');
    var mongo_id = new mongo.ObjectID(req.params.category_id);
    var category = collection.find({category_id:mongo_id}).toArray(function (err, category) {
        res.send(category);
    })

})

router.get('/products', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('products');
    collection.find().toArray(function (err, docs) {
        res.send(docs);
    })
});

router.get('/products/:product_name', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('products');
    var product_name = req.params.product_name;
    var category = collection.findOne({productName:product_name}, function (err, products) {
        res.send(products);
    })
});


module.exports = router;

