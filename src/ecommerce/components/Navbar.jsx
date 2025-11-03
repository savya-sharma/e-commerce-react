import React from 'react'
import { Link } from 'react-router-dom'
import { FaIndianRupeeSign } from "react-icons/fa6";


const Navbar = () => {
    return (
        <div>
            <nav className='relative overflow-hidden flex justify-between px-4 bg-[#F9F7FA] text-[#C63E21] py-4'>
                <h1 className='z-10 text-[1.3vw] font-[machina-bold] font-bold'>My Website</h1>
                <ul className='flex gap-8 z-10 font-[machina-light]'>
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
