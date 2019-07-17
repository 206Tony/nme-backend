const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
  name: String
  // pizza: [{
  //   type: mongoose.Schema.Types.ObjectId, //
  //   ref: 'Pizza'
  // }]
})

module.exports =  mongoose.model('Topping', toppingSchema);