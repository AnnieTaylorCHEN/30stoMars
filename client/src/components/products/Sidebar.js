import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div>
            <section className="shop-sidebar">
                <div className="shop-sidebar__item">
                    <h6><a href="/shop" >Everything</a></h6>
                </div>
                <div className="shop-sidebar__item">
                    <h6>Category</h6>
                    <a href="/shop?category=music" >MUSIC</a>
                    <Link to="/shop?category=merch" >MERCH</Link> 
                </div>
                <div className="shop-sidebar__item">
                    <h6>Price</h6>
                    <a href="/shop?sortBy=price:asc" > low to high</a>
                    <Link href="/shop?sortBy=price:desc"  > high to low</Link>
                </div>
                <div className="shop-sidebar__item">
                    <h6>Alphabet</h6>
                    <a href="/shop?sortBy=name:asc" >A to Z</a>
                    <a href="/shop?sortBy=name:desc" >Z to A</a>
                </div>
            </section>
        </div>
    )
}

