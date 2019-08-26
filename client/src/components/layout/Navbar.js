import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
        <div className="header">
            <nav className="nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/story">Story</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/echelon">Echelon</NavLink>
            </nav>
        </div>
        </>
    )
}
