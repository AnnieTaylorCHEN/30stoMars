import React from 'react'


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
                    <a href="/shop?category=merch" >MERCH</a> 
                </div>
                <div className="shop-sidebar__item">
                    <h6>Price</h6>
                    <a href="/shop?sortBy=price:asc" > low to high</a>
                    <a href="/shop?sortBy=price:desc"  > high to low</a>
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

