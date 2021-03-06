var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var dbConnection = require('../dbConnections/mongoDbconnection');
var url = require('../dbConnections/config').url;

router.use(function(req,res,next){
    dbConnection.connect(url,next);
})

router.get('/categories', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('categories');
    collection.find().sort({categoryPriority:1}).toArray(function (err, docs) {
        res.send(docs);
    })
    dbConnection.close(function(err){
        if(err){
            console.log('error occourd connectiong to db');
        }
    });
    
});

router.get('/categories/:category_name', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('categories');
    var name = req.params.category_name;
    var category = collection.findOne({categoryName:name}, function (err, category) {
        res.send(category);
    })
    dbConnection.close(function(err){
        if(err){
            console.log('error occourd connectiong to db');
        }
    });

})

router.get('/categories/:category_id/products', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('products');
    var mongo_id = new mongo.ObjectID(req.params.category_id);
    var category = collection.find({category_id:mongo_id}).toArray(function (err, category) {
        res.send(category);
    })
    dbConnection.close(function(err){
        if(err){
            console.log('error occourd connectiong to db');
        }
    });

})

router.get('/products', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('products');
    collection.find().toArray(function (err, docs) {
        res.send(docs);
    })
    dbConnection.close(function(err){
        if(err){
            console.log('error occourd connectiong to db');
        }
    });
});

router.get('/products/:product_name', function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('products');
    var product_name = req.params.product_name;
    var category = collection.findOne({productName:product_name}, function (err, products) {
        res.send(products);
    })
    dbConnection.close(function(err){
        if(err){
            console.log('error occourd connectiong to db');
        }
    });
});


module.exports = router;

