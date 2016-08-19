var express = require('express');
var router = express.Router();
var NewOrder = require('../models/order').NewOrder;

router.get('/orders/new',function(req,res){
	NewOrder.find({}, function(err,order){
		if(err) console.log(err);
		res.send(order);
	})
})

router.get('/orders/:orderid',function(req,res){
	NewOrder.findById(req.params.orderid, function(err,order){
		if(err) console.log(err);
		res.send(order);	
	})
})

router.get('/orders/ready',function(req,res){
	var userName = req.params.userName;
	Order.find({userName : userName}, function(err,order){
		if(err) console.log(err);
		res.send(order);
	})
})

module.exports = router;
