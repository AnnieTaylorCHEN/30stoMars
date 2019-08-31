import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateItemCount, removeFromCart } from '../../actions/cart'


const Cart = ({
    toggleCartButton,
    cartVisibility, 
    updateItemCount, 
    removeFromCart,
    cart 
 }) => {
    let visibility = 'hide'

    if (cartVisibility) {
        visibility = 'show'
    }

    const addCount = ({_id}) => {
        let count = 1 
        updateItemCount({_id, count})
    }
 
    const minusCount = ({_id}) => {
        let count = -1 
        updateItemCount({_id, count})
    }

    return (
        <div id="cart" className={visibility} >
            <div className="cart-grid">
                <div className="cart-grid__details-wrapper">
                {cart.map(cartItem => (
                    <Fragment key={cartItem._id}>
                    <div className="cart-grid__details">
                        <div className="cart-img">
                            <img  src={`/imgs/${cartItem.imgName}`} alt={cartItem.name} />
                        </div>
                        <div>
                            <h6>{cartItem.name}</h6>
                            <p>${cartItem.price}</p>
                        </div>
                        <div className="cart-qty"> 
                            <img src="/imgs/minus.svg" alt="remove 1 quantity" onClick={() => minusCount(cartItem._id)}/>
                            <p>{cartItem.count}</p>
                            <img src="/imgs/plus.svg" alt="add 1 quantity" onClick={() => addCount(cartItem._id)} />
                        </div>
                        <div>
                            <button type="button" className="cart-delete-btn" onClick={()=>removeFromCart(cartItem._id)} >&times;</button>
                        </div>
                    </div>
                    </Fragment>
                ) )}
                </div>
            
                <div className="cart-grid__total">
                    <h4>CART TOTAL</h4>
                    <p>$2000</p>
                    <button type="button" className="btn">Checkout</button>
                </div>

                <button type="button" className="back-to-shop" onClick={toggleCartButton} >&times;</button>
            </div>
        </div>
    )
}

Cart.propTypes = {
    toggleCartButton: PropTypes.func.isRequired, 
    cart: PropTypes.array.isRequired,
    updateItemCount: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { updateItemCount, removeFromCart })(Cart)
