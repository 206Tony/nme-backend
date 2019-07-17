const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: String,
  size: Number,
  price: String,
  topping: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Topping'
  }]
})

module.exports =  mongoose.model('Pizza', pizzaSchema);