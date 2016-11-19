var express = require('express');
var router = express.Router();
var request = require('request');

var options = {
  sms_url : 'https://cremacafe.auth0.com/passwordless/start',
  login_url: 'https://cremacafe.auth0.com/oauth/ro',
  headers: {
    'Content-Type' : 'application/json'
  }
};

router.post('/sendSms', function(req, res) {
	var phoneNumber = req.body.phoneNumber;
    if (!phoneNumber) {
      res.status(400).send();
    }
    else{
    	sendSMS(phoneNumber,function(response){
    		var json = JSON.parse(response);
    		if(json.error){
    			res.send(400);
    		}
    		else{
    			res.send(json);
    		}
    	});
    	
	}
});

router.post('/getCode', function(req, res) {
	var phoneNumber = req.body.phoneNumber;
	var passcode = req.body.passcode;
   
    if(!passcode || !phoneNumber){
      res.status(400).send();
    	
    }
    else{
    	login(passcode, phoneNumber, function(response){
    		var json = JSON.parse(response);
    		if(!json.id_token){
    			res.status(400).send();
    		}else{
    			res.send(json)
    		}
    	});
    	
    }
});




function sendSMS(phoneNumber,callback){
   	var data = {
	  "client_id":    "EgY7ZjhvdKrGc3r7X5k6DSXwZpczJIKL", // Crema Cafe
	  "connection":   "sms",
	  "phone_number": phoneNumber
	}

	request.post({
		headers: options.headers,
		url : options.sms_url,
		form : data
	}, function(err,response,body){
		if(err){
			throw new Error(err);
		}
		else{
			callback(body);
		}
	})
}

function login(passcode, phoneNumber,callback){
  	var data = {
		  "client_id":   "EgY7ZjhvdKrGc3r7X5k6DSXwZpczJIKL", // Crema Cafe
		  "connection":  "sms",
		  "grant_type":  "password",
		  "username":    phoneNumber,
		  "password":    passcode,
		  "scope":       "openid"
	}

	var result = request.post({
		headers: options.headers,
		url: options.login_url,
		form: data
	}, function(err,response, body){
		if(err){
			throw new Error(err);
		}
		else{
			callback(body);
		}
	})

	
};

module.exports = router;