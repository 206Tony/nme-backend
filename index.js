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

app.get('/', (req, res) =>{
  Topping.find({}, function(err, toppings) {
    if(err) res.json(err)
    res.json(toppings)
  })
})

app.post('/pizzas', (req, res) => {
  Pizza.create({
    name: req.body.name,
    size: req.body.size,
    price: req.body.price
  }, function(err, pizza) {
    res.json(pizza)
  })
})

app.post('/toppings', (req, res) => {
  Topping.create({
    name: req.body.name
  }, function(err, toppings) {
    res.json(toppings)
  })
})

app.get('/pizzas/:id', (req, res) => {
  Pizza.findById(req.params.id).populate('pizzas').exec(function(err, pizza) {
    if (err) res.json(err)
    res.json(pizza);
  })
})

app.get('/delete', (req, res) => {
  Pizza.remove({name: " "}, function(err) {
    if (err) res.json(err);
    res.json({message: 'DELETED'})
  })
})

app.get('/destroyname', (req, res) => {
  Pizza.findOneAndRemove({name: ""}, function(err) {
    if(err) res.json(err)
    res.json({message: 'DELETED'})
  })
})

app.get('/delete', (req, res) => {
  Topping.remove({name: " "}, function(err) {
    if (err) res.json(err);
    res.json({message: 'DELETED'})
  })
})

app.get('/destroyname', (req, res) => {
  User.findOneAndRemove({name: " "}, function(err) {
    if(err) res.json(err)
    res.json({message: 'DELETED'})
  })
})

app.listen(3001, () => {
  console.log('Pizza Man 3001')
})