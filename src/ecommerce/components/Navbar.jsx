import React from 'react'
import { Link } from 'react-router-dom'
import { FaIndianRupeeSign } from "react-icons/fa6";


const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-between px-4 bg-purple-800 text-white py-4'>
                <h1>My Website</h1>
                <ul className='flex gap-8'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link className='flex items-center' to="/cart"> <FaIndianRupeeSign /> Cart</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
