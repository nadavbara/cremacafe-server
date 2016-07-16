var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var url = require('../dbConnections/config');

mongoose.connect(url);

var orderSchema = new Schema({
  userName: String,
  phoneNumber: String,
  orderProducts: [String],
  orderNotes: String,
  timeForPickup: Number,
  totalAmount: Number,
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;