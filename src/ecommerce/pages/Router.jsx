import React from 'react'
import { Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import About from './About'
import Blog from './Blog'
import Cart from './Cart'
import Contact from './Contact'
// import Home from './Home'
import First from './First'
import OutletComponent from '../components/OutletComponent'
import SingleProduct from './SingleProduct'
import Login from './Login'
import Register from './Register'
import CartProvider from '../contexts/CartProvider'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <OutletComponent />,
        children: [
            {
                index: true,
                element: <First />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: 'product/:id',
                element: <SingleProduct />
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },

])
const Router = () => {

    return (
        <CartProvider>
            <RouterProvider router={routes} />
        </CartProvider>
    )
}

export default Router
