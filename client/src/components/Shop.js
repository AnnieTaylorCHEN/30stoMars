import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Sidebar from './products/Sidebar'
import Products from './products/Products'
import Cart from './products/Cart'

const Shop = ({cart})=> {

    const [cartVisible, setCartVisible] = useState(false)

    const toggleCartButton = () => {
        setCartVisible(!cartVisible)
    }

    return (
        <div>
        <div className="shop-grid">
            <Sidebar />
            <Products />
            <div className="cart-btn">
                <img  src="/imgs/cart.svg" alt="cart button" onClick={() => toggleCartButton()} />
                <span>{ cart.length > 0 && cart.length}</span>
            </div>
        </div>
        <Cart toggleCartButton={toggleCartButton} cartVisibility={cartVisible} />
        </div>
    )
}

Shop.propTypes = {
    cart: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, null )(Shop)