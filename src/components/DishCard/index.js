import {Component} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

class DishCard extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 0}
  }

  onCilckIncrease = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
    console.log('increase clicked quantity')
  }

  onCilckDecrease = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
      console.log('decrease clicked quantity')
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {dishDetails} = this.props
          const {quantity} = this.state
          const {
            dishAvailability,
            dishCalories,
            dishCurrency,
            dishDescription,
            dishImage,
            dishName,
            dishPrice,
            addonCat,
          } = dishDetails
          const len = addonCat.length
          const {addCartItem} = value
          const onClickAddToCart = () => {
            addCartItem({...dishDetails, quantity})
          }
          return (
            <li className="card-item">
              <div>
                <h1>{dishName}</h1>
                <p className="dishCurrency">
                  {dishCurrency} {dishPrice}
                </p>
                <p>{dishDescription}</p>
                {dishAvailability ? (
                  <div>
                    <button
                      type="button"
                      onClick={this.onCilckDecrease}
                      className="minus-btn"
                    >
                      -
                    </button>
                    <span className="span">{quantity}</span>
                    <button
                      type="button"
                      onClick={this.onCilckIncrease}
                      className="plus-btn"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="not-">Not available</p>
                )}

                {len >= 1 && <p className="custom">Customizations available</p>}
                {dishAvailability && (
                  <button
                    className="add-btn"
                    type="button"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
              <div>
                <p className="not-">{`${dishCalories} calories`}</p>
              </div>
              <div>
                <img src={dishImage} alt={dishName} />
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default DishCard
