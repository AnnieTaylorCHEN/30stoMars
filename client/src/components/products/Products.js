import React, {useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loader from '../layout/Loader'
import ProductItem from './ProductItem'

import { getProducts } from '../../actions/products'
import { addToCart } from '../../actions/cart'


const Products = ({
    getProducts,
    addToCart,
    product: {
        products,
        loading
    }
}) => {

    useEffect(() => {
        getProducts()
    }, [getProducts])

    return  loading ? <Loader /> : (
        <Fragment>
            <section className="products-grid">
            {products.map(product => (
                <ProductItem key={product._id} product={product} addToCart={addToCart} />
            ))}
            </section>
        </Fragment>
    )
    
}

Products.propTypes = {
    product: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, {getProducts, addToCart})(Products)

