import { NavLink } from 'react-router-dom'
import { useCart } from '../contexts/CartProvider';
import { useAuth } from '../contexts/AuthProvider';
import { useCurrency } from '../contexts/Currency';
import React from 'react';

const Navbar = () => {
    const { cart } = useCart();
    const { isLoggedIn, logout } = useAuth();
    const { currency, setCurrency } = useCurrency();

    // Simple function: When user selects a currency, update it
    function handleCurrencyChange(e) {
        setCurrency(e.target.value); // e.target.value = selected option (INR, USD, EUR)
    }

    return (
        <div>
            <nav className='relative overflow-hidden flex justify-between px-4 bg-[#F9F7FA] text-[#C63E21] py-4'>
                <NavLink to="/">
                    <h1 className='z-10 text-[1.3vw] font-[machina-bold] font-bold'>My Website</h1>
                </NavLink>
                <div className="flex items-center gap-8">
                    <ul className='flex gap-8 z-10 font-[machina-light] text-[0.9vw]'>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/blog">Blog</NavLink></li>
                        <li>
                            <NavLink className='flex items-center' to="/cart">
                                SHOPPING BAG[{cart.length}]
                            </NavLink>
                        </li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        {isLoggedIn ? (
                            <button onClick={logout} className="logout">
                                Logout
                            </button>
                        ) : (
                            <NavLink to="/login">Login</NavLink>
                        )}
                    </ul>

                    {/* Currency Dropdown - User can select currency here */}
                    <div className="ml-6 font-[machina-light]">
                        <select
                            className="bg-white border border-gray-300 rounded px-3 py-1.5 text-[0.9vw] focus:outline-none focus:border-[#C63E21] cursor-pointer"
                            value={currency}  // Shows currently selected currency
                            onChange={handleCurrencyChange}  // When user changes, call handleCurrencyChange
                        >
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
