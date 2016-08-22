var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var client = twilio('AC8da339595d406da3563966808fb98085', '87386ced0c4b111b6731ee988f39997c');
var NewOrder = require('../models/order').NewOrder;
var ReadyOrder = require('../models/order').ReadyOrder;

router.get('/new',function(req,res){
	NewOrder.find({},function(err,orders){
		var ordersIDs = orders.map(function(order){
			return order._id;
		})
		res.send(ordersIDs);
	})
})

router.get('/ready',function(req,res){
	ReadyOrder.find({},function(err,orders){
		var ordersIDs = orders.map(function(order){
			return order._id;
		})
		res.send(ordersIDs);
	})
})

router.get('/new/:orderid',function(req,res){
	NewOrder.findById(req.params.orderid, function(err,order){
		if(err) console.log(err);
		res.send(order);	
	})
})

router.get('/ready/:orderid',function(req,res){
	ReadyOrder.findById(req.params.orderid, function(err,order){
		if(err) console.log(err);
		res.send(order);	
	})
})

router.get('/orders/new/:orderid',function(req,res){

	NewOrder.findByIdAndRemove(req.params.orderid, function(err,order){
		if(err){console.log(err)}
		else{
			/*client.sendMessage({
				to: order.phoneNumber,
				from: '+1 315-836-4481 ',
				body: 'ההזמנה שלך מוכנה בקרמה קפה! תשלום בקופה: ' + order.totalAmount,
			})*/
			var readyOrder = new ReadyOrder({
				userName: order.userName,
				phoneNumber: order.phoneNumber,
				orderProducts: order.orderProducts,
				orderNotes: order.orderNotes,
				timeForPickup: order.timeForPickup,
				totalAmount: order.totalAmount,
				orderDate: order.orderDate,
				orderTime: order.orderTime,
			});
			readyOrder.save(function(err){
				if(err) {console.log(err);}
			});
			res.send("success");
		}
	});
});

router.get('/orders/ready/:orderid',function(req,res){

	ReadyOrder.findByIdAndRemove(req.params.orderid, function(err,order){
		if(err){console.log(err)}
		else{
			res.send("success");
		}
	});
});


module.exports = router;
