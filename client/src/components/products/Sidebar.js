import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <section className="shop-sidebar">
                <div className="shop-sidebar__item">
                    <h4>Category</h4>
                    <Link to="/shop?category=music" >MUSIC</Link>
                    <a href="/shop?category=merch" >MERCH</a> 
                </div>
                <div className="shop-sidebar__item">
                    <h4>Price</h4>
                    <a href="/shop?sortBy=price:asc" > low to high</a>
                    <a href="/shop?sortBy=price:desc"  > high to low</a>
                </div>
                <div className="shop-sidebar__item">
                    <h4>Alphabet</h4>
                    <a href="/shop?sortBy=name:asc" >A to Z</a>
                    <a href="/shop?sortBy=name:desc" >Z to A</a>
                </div>
            </section>
        </>
    )
}

