import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import About from './About'
import Blog from './Blog'
import Cart from './Cart'
import Contact from './Contact'
import First from './First'
import OutletComponent from '../components/OutletComponent'
import SingleProduct from './SingleProduct'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import ProctectedRoute from '../components/ProctectedRoute'
import CartProvider from '../contexts/CartProvider'
import AuthProvider from '../contexts/AuthProvider'
import CurrencyProvider from '../contexts/Currency'

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
                path: 'about',
                element: <About />
            },
            {
                path: 'product/:id',
                element: <SingleProduct />
            },
            {
                path: 'blog',
                element: <Blog />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'home',
                element: (
                    <ProctectedRoute>
                        <Home />
                    </ProctectedRoute>
                ),
            }
        ]
    },
])

const Router = () => {
    return (
        <AuthProvider>
            <CurrencyProvider>
                <CartProvider>
                    <RouterProvider router={routes} />
                </CartProvider>
            </CurrencyProvider>
        </AuthProvider>
    )
}

export default Router
