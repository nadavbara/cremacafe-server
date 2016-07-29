var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var jwtCheck = require('../jwt/validateJWT');

router.post('/',jwtCheck,function(req,res){

	var userName = req.body.userName,
	phoneNumber =  req.body.phoneNumber,
	orderProducts =  req.body.orderProducts,
	orderNotes =  req.body.orderNotes,
	timeForPickup =  req.body.timeForPickup,
	totalAmount =  req.body.totalAmount,
	orderTime = req.body.orderTime,
	orderDate = req.body.orderDate;


	var order = new Order({
		userName : userName,
		phoneNumber : phoneNumber,
		orderProducts : orderProducts,
		orderNotes : orderNotes,
		timeForPickup : timeForPickup,
		totalAmount : totalAmount,
		orderTime : orderTime,
		orderDate : orderDate
	});



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

module.exports = router;

