var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var url = require('../dbConnections/config');

mongoose.connect(url);

var orderSchema = new Schema({
  userName: String,
  phoneNumber: String,
  orderProducts: { type : Array , "default" : [] },
  orderNotes: String,
  timeForPickup: String,
  totalAmount: Number,
  orderDate: String,
  orderTime: String
});

var Order = mongoose.model('Order', orderSchema);
var NewOrder = mongoose.model('newOrder', orderSchema);

module.exports = {Order:Order,NewOrder:NewOrder};