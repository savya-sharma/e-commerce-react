import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='relative flex justify-between px-4 bg-[#F9F7FA] text-[#C63E21] py-8'>
            <p className='z-10 font-[halve-light]'>&copy; {new Date().getFullYear()}</p>
            <ul className='flex gap-8 z-10 font-[machina-light]'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    )
}

export default Footer
