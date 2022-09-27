import React, { Component } from 'react';

class OrderForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      ingredients: [],
      errors: {
        noIngredients: false,
        tooManyIngredients: false,
      },
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      errors: {
        noIngredients: false,
      },
    });
    if (!this.state.ingredients.length) {
      return this.setState({
        errors: {
          noIngredients: true,
        },
      });
    }

    const newOrder = {
      ...this.state,
    };
    this.props.createNewOrder(newOrder);
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: [] });
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    this.setState({
      errors: {
        tooManyIngredients: false,
      },
    });

    if (this.state.ingredients.filter(
      (ingredient) => ingredient === e.target.name
    ).length === 2
    ) {
      return this.setState({
        errors: {
          tooManyIngredients: true,
        },
      });
    }
    this.setState({
      ingredients: [...this.state.ingredients, e.target.name],
    });
   };

   handleNameChange = (e) => {
    e.preventDefault();
    this.setState({
      name: e.target.value,
    });
   };


  render() {
    const possibleIngredients = ['frijoles', 'carnitas', 'sofritas', 'lechuga', 'queso fresco', 'pico de gallo', 'salsa picante', 'guacamole', 'jalapenos', 'cilantro', 'crema mexicana', 'lengua', 'al pastor', 'carne asada'];


    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button 
          key={ingredient} 
          name={ingredient} 
          onClick={e => this.handleIngredientChange(e)}
        >
          {ingredient}
        </button>
      )
    });

    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
          required
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nada seleccione' }</p>
        {this.state.errors.noIngredients ? (
          <p className='error'>Por favor, seleccione al menos un ingrediente!</p>
        ) : ('')}
        {this.state.errors.tooManyIngredients ? (
          <p className="error">
              Ya tienes demasiado de eso!
          </p>
        ) : ('')}
        <button type="submit">Ordenar</button>
      </form>
    )
  }
}

export default OrderForm;
