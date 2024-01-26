import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {FaCartArrowDown} from 'react-icons/fa'
import './index.css'

import CartContext from '../../context/CartContext'

const Header = props => {
  const {heading} = props
  const deleteBtn = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : (
              <span>0</span>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-bar">
      <Link to="/" className="link-item">
        {heading}
      </Link>
      <Link to="/cart" className="link-item">
        Cart
      </Link>
      <button type="button" className="logout-btn" onClick={deleteBtn}>
        Logout
      </button>
      <div className="header-container">
        <p>My Orders </p>
        <FaCartArrowDown />
        {renderCartItemsCount()}
      </div>
    </nav>
  )
}
export default withRouter(Header)
