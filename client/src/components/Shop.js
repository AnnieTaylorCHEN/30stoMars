import React, { useState } from 'react'

import Sidebar from './products/Sidebar'
import Products from './products/Products'
import Cart from './products/Cart'

export default function Shop() {

    const [cartVisible, setCartVisible] = useState(false)

    const toggleCartButton = () => {
        setCartVisible(!cartVisible)
    }

    return (
        <>
        <div className="shop-grid">
            <Sidebar />
            <Products />
            <div className="cart-btn">
                <img  src="/imgs/cart.svg" alt="cart button" onClick={() => toggleCartButton()} />
            </div>
        </div>
        <Cart toggleCartButton={toggleCartButton} cartVisibility={cartVisible} />
        </>
    )
}
