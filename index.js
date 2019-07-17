const express = require('express');
const mongoose = require('mongoose');
const Pizza = require('./models/pizza');
const Topping = require('./models/topping');
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
mongoose.connect('mongodb://localhost/nme-backend'); // Connect to Mongo!

app.get('/pizzas', (req, res) => {
  Pizza.find({}, function(err, pizzas) {
    if (err) res.json(err)
    res.json(pizzas)
  })
})

app.get('/pizzas/:id', (req, res) => {
  Pizza.findById(req.params.id).populate('topping').exec( (err, pizza) => {
    if(!err) {
      res.status(200).json(pizza);
    } else {
      res.status(500).json(err)

    }
  })
})

app.post('/pizzas', (req, res) => {
  console.log(req.body)
  let pizza = new Pizza({
    name: req.body.name,
    size: req.body.size,
    price: parseInt(req.body.price)
  });
  pizza.save((err, pizza) => {
    console.log("----- INSIDE PIZZA SAVE")
    if(err) res.json(err);
    res.status(201).json(pizza);
  });
})

app.put('/pizzas/:id', (req, res) => {
  Pizza.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    size: req.body.size,
    price: parseInt(req.body.price)
  }, {
    new: true
  }, (err, pizza) => {
    res.status(203).json(pizza);
  });
});

app.get('/pizzas/:pid/topping', (req, res) => {
  Pizza.findById(req.params.pid).populate('toppings').exec ( (err, pizzas) => {
    res.status(200).json(queen.toppings);
  })
})

app.get('/pizzas/:pid/toppings/:tid', (req, res) => {
  Topping.findById(req.params.tid, (err, topping) => {
    res.status(200).json(topping);
  });
});


app.post('/pizzas/:pid/toppings', (req, res) => {
  Pizza.findById(req.params.pid, (err, pizza) => {
    let newTopping = new Topping({
      name: req.body.name
    })
    newTopping.save((err, topping) => {
      pizza.toppings.push(topping._id);
      pizza.save( (err, pizza) => {
      res.status(200).json(pizza); 
      })
    })
  })
})

app.delete('/pizzas/:pid/toppings/:tid', (req, res) => {
  Pizza.findById(req.params.pid, function(err, pizza) {
    pizza.toppings.pull(req.params.tid)
    pizzas.save(err => {
      if (err) res.json(err);
      Topping.deleteOne({_id: req.params.tid}, err => {
        if(err) res.json(err)
        res.json(1);
      })
    })
  })
})

app.listen(3001, () => {
  console.log('Pizza Man 3001')
})