import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import Home from './components/Home'
import Cart from './components/Cart'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItem = () => {
    this.setState({cartList: []})
  }

  increaseCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (id === each.dishId) {
          const updateQuantity = each.quantity + 1
          return {...each, quantity: updateQuantity}
        }
        return each
      }),
    }))
  }

  decreaseCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(each => each.dishId === id)
    if (productObject.quantity > 1) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (id === each.dishId) {
            const updateQuantity = each.quantity - 1
            return {...each, quantity: updateQuantity}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.dishId !== id)
    this.setState({cartList: filteredList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(each => each.dishId === product.dishId)
    if (productObject) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (productObject.dishId === each.dishId) {
            const updateQuantity = each.quantity + product.quantity
            return {...each, quantity: updateQuantity}
          }
          return each
        }),
      }))
    } else {
      const updateCartList = [...cartList, product]
      this.setState({cartList: updateCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.increaseCartItemQuantity,
          decrementCartItemQuantity: this.decreaseCartItemQuantity,
          removeAllCartItems: this.removeAllCartItem,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
