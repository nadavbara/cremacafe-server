var express = require('express');
var router = express.Router();
var twilio = require('twilio')();
var twilioAPI = require('../dbConnections/config').twilio;
var admin_pass = require('../dbConnections/config').admin_pass;
var NewOrder = require('../models/order').NewOrder;
var ReadyOrder = require('../models/order').ReadyOrder;

router.use(function(req,res,next){
	var header = req.get('X-Authoriztion-Admin');
	if(admin_pass != header){
		res.status(401).send("Unauthorized!");
	}
    else{
    	next();
    }
})

router.get('/new',function(req,res){
	NewOrder.find({}).sort({timeForPickup: 1}).exec(function(err,orders){
		var ordersIDs = orders.map(function(order){
			return order._id;
		})
		res.send(ordersIDs);
	})
})

router.get('/ready',function(req,res){
	ReadyOrder.find({}).sort({timeForPickup: 1}).exec(function(err,orders){
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
			twilio.sendMessage({
				to: order.phoneNumber,
				from: '+1 315-836-4481 ',
				body: 'ההזמנה שלך מוכנה בקרמה קפה! תשלום בקופה: ' + order.totalAmount + ' ש"ח',
			})
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
