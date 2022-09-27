import React, { Component } from "react";
import "./App.css";
import { getOrders, postOrder, deleteOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    getOrders()
      .then((data) =>
        this.setState({
          orders: data.orders,
        })
      )
      .catch((err) => console.error("Error fetching:", err));
  }

  createNewOrder = (newOrder) => {
    return postOrder(newOrder).then((res) =>
      this.setState({
        orders: [...this.state.orders, res],
      })
    );
  };

  handleDelete = (e) => {
    const orderToRemove = this.state.orders.find(order => order.id === Number(e.target.id))
    deleteOrder(e.target.id).then(res => {
      if (res.ok) {
        this.setState({
          orders: this.state.orders.filter(order => order.id !== orderToRemove.id)
        })
      } else {
        return alert(res.message)
      }
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Papi Patricio's Burritos!</h1>
          <OrderForm createNewOrder={this.createNewOrder} />
        </header>
        <Orders handleDelete={this.handleDelete} orders={this.state.orders} />
      </main>
    );
  }
}

export default App;