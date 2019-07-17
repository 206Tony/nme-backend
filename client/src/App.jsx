import React from 'react';
import PizzaList from './PizzaList';
//import ToppingList from './ToppingList';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pizzas: [],
      pizzaName: '',
      pizzaSize: '',
      pizzaPrice: ''
    }
    this.handlePizzaNameChange = this.handlePizzaNameChange.bind(this);
    this.handlePizzaPriceChange = this.handlePizzaPriceChange.bind(this);
    this.handlePizzaSizeChange = this.handlePizzaSizeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/pizzas', {
      name: this.state.pizzaName,
      size: this.state.pizzaSize,
      price: parseInt(this.state.pizzaPrice)
    }).then( (response) => {
      axios.get('/pizzas').then( (response) => {
        this.setState({
          pizzas: response.data
        })
      })
    })
  }

  handlePizzaNameChange(e) {
    this.setState({
      pizzaName: e.target.value
    })
  }

  handlePizzaSizeChange(e) {
    this.setState({
      pizzaSize: e.target.value
    })
  }

  handlePizzaPriceChange(e) {
    this.setState({
      pizzaPrice: e.target.value
    })
  }

  componentDidMount() {
    axios.get("/pizzas")
    .then(res => {
      this.setState({
        pizzas: res.data
      })
    })
  }

  render() {
    return (
      <div className='App'>
        <PizzaList pizzas={this.state.pizzas}
                handlePizzaNameChange={this.handlePizzaNameChange}
                handlePizzaPriceChange={this.handlePizzaPriceChange}
                handlePizzaSizeChange={this.handlePizzaSizeChange}
                name={this.state.pizzaName}
                price={this.state.pizzaPrice} 
                size={this.state.pizzaSize}
                handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default App;
