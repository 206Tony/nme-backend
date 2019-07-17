import React from 'react';

const PizzaList = props => {
  let pizzas;
  if ( props.pizzas.length ) {
    pizzas = props.pizzas.map((pizza, i) => {
      return <p className='pizzarow' key={i}>{pizza.name} | {pizza.size} | {pizza.price}</p>
    })
  } else {
    pizzas = <p>No Pizza Data</p>
  }
  return (
    <div className='PizzaList'>
      <h3>All the Pizzas:</h3>
      {pizzas}
      <hr />
      <form onSubmit={props.handleSubmit}>
        <input onChange={props.handlePizzaNameChange} type="text" name='name' value={props.name} />
        <input onChange={props.handlePizzaSizeChange} type="text" name='size' value={props.size} />
        <input onChange={props.handlePizzaPriceChange} type="text" name='price' value={props.price} />
        <input type="submit" value='Add Pizza' />
      </form>
    </div>
  )
}

export default PizzaList;