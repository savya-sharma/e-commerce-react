import { NavLink } from 'react-router-dom'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useCart } from '../contexts/CartProvider';
import { useAuth } from '../contexts/AuthProvider';

const Navbar = () => {
    const { cart } = useCart();
    const { isLoggedIn, logout } = useAuth();

    return (
        <div>
            <nav className='relative overflow-hidden flex justify-between px-4 bg-[#F9F7FA] text-[#C63E21] py-4'>
                <NavLink to="/">
                    <h1 className='z-10 text-[1.3vw] font-[machina-bold] font-bold'>My Website</h1>
                </NavLink>
                <ul className='flex gap-8 z-10 font-[machina-light]'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/blog">Blog</NavLink></li>
                    <li>
                        <NavLink className='flex items-center' to="/cart">
                            <FaIndianRupeeSign />cart({cart.length})
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
            </nav>
        </div>
    )
}

export default Navbar
