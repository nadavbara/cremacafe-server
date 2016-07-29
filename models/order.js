var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var url = require('../dbConnections/config');

mongoose.connect(url);

var orderSchema = new Schema({
  userName: String,
  phoneNumber: String,
  orderProducts: { type : Array , "default" : [] },
  orderNotes: String,
  timeForPickup: Number,
  totalAmount: Number,
  orderDate: String,
  orderTime: String
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;