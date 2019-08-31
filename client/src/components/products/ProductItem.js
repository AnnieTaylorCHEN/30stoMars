import React from 'react'


const ProductItem = ({
    addToCart,
    product :{
        _id,
        name,
        price,
        imgName
    }
}) => {

    return (
        <div>
            <div key={_id} className="product-item">
                <img src={`imgs/${imgName}`} alt={name} />
                <div className="product-item__meta">
                    <button className="btn" onClick={()=>addToCart({_id, name, price, imgName})} >BUY</button>
                    <div className="product-item__price">${price}</div>
                </div>
            </div>
        </div>
    )
}


export default ProductItem
