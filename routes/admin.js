var express = require('express');
var router = express.Router();
var NewOrder = require('../models/order').NewOrder;

router.get('/orders/new',function(req,res){
	NewOrder.find({},function(err,orders){
		var ordersIDs = orders.map(function(order){
			return order._id;
		})
		res.send(ordersIDs);
	})

})

router.get('/orders/:orderid',function(req,res){
	NewOrder.findById(req.params.orderid, function(err,order){
		if(err) console.log(err);
		res.send(order);	
	})
})

router.get('/orders/ready/:orderid',function(req,res){
	console.log(req.params.orderid);
	NewOrder.findById(req.params.orderid).remove(function(err){
		if(err){console.log(err)};
		res.send("success");
	});
})

module.exports = router;
