var express = require('express');
var router = express.Router();
var Order = require('../models/order').Order;
var NewOrder = require('../models/order').NewOrder;
var jwtCheck = require('../jwt/validateJWT');

router.post('/',/*jwtCheck,*/function(req,res){

	req.body.timeForPickup = calculatePickupTime(req.body.timeForPickup);

	var order = new Order(req.body);

	var newOrder = new NewOrder(req.body);

	newOrder.save(function(err){
		if(err) console.log(err);
	})

	order.save(function(err){
		if(err) console.log(err);
		res.send(order);
	});
	
});

router.get('/:userName',function(req,res){
	var userName = req.params.userName;
	Order.find({userName : userName}, function(err,order){
		if(err) console.log(err);
		res.send(order);
	})
})


calculatePickupTime = function(timeForPickup){	
		const now = new Date();
		now.setMinutes(now.getMinutes() + timeForPickup);
		const minutes = (now.getMinutes()<10?'0':'') + now.getMinutes();
		const hours = ("0" + now.getHours()).slice(-2);
		return absoluteTimeForPickup = hours + ':' + minutes;
	}

module.exports = router;

