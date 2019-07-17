const express = require('express');
const mongoose = require('mongoose');
const Pizza = require('./models/pizza');
const Topping = require('./models/topping');
const app = express();

app.use(express.urlencoded({ extended: false}));
mongoose.connect('mongodb://localhost/nme-backend'); // Connect to Mongo!

app.get('/', (req, res) => {
  Pizza.find({}, function(err, pizzas) {
    if (err) res.json(err)
    res.json(pizzas)
  })
})

app.post('/pizzas/:id', (req, res) => {
  Pizza.create({
        name: req.body.name,
        size: req.body.size,
        price: req.body.price
    }, function(err, pizzas) {
    res.json(pizzas)
  })
})

app.get('/:name', (req, res) => {
  Pizza.findOne({name: req.params.name}, function(err, pizzas) {
    res.json({message: "DELETED", pizzas})
  })
})

app.get('/pizzas/:pid/toppings/tid', (req, res) => {
  Toppings.findById(req.params.tid, (err, topping) => {
    res.json(topping)
  })
})

app.get('/pizzaupdate/:name', (req, res) => {
  Pizza.findOneAndUpdate({name: req.params.name},
    {$set:{
        name: req.body.name,
        size: req.body.size,
        price: req.body.price
      }
    },{new: true}, function(err, pizzas) {
      if(err) res.json(err)
    res.json(pizzas)
  })
})

app.post('/pizzas/:name/toppings', (req, res) => {
  Pizza.findOne({ name: req.params.name}, function(err, pizza) {
    Toppings.create({name: req.body.name}, function(err, topping) {
      pizza.toppings.push(topping._id)
      pizza.save(function(err, pizza) {
        if(err) res.json(err)
        res.json(pizza)
      })
    })
  })
})

app.delete('/pizzas/:pid/toppings/:tid', (req, res) => {
  Pizza.findById(req.params.pidf, function(err, pizza) {
    pizza.toppings.pull(req.params.tid)
    pizzas.save(err => {
      if (err) res.json(err);
      Toppings.deleteOne({_id: req.params.tid}, err => {
        if(err) res.json(err)
        res.json(1);
      })
    })
  })
})

app.listen(3001, () => {
  console.log('Pizza Man 3001')
})