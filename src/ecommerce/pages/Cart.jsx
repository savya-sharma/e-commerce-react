import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartProvider'
import instance from '../config/axiosConfig';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { cart } = useCart();
  console.log(cart)

  useEffect(() => {
    getCartProducts();
  }, []);

  async function getCartProducts() {
    const promises = cart.map((obj) => {
      return instance.get("/product/product/" + obj.id);
    });
    let temp = await Promise.all(promises);
    console.log(temp);
    setCartItems(temp.map((obj) => obj.data));
  }

  // Calculate totals
  const subTotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const discount = subTotal * 0.5; // 50% discount
  const deliveryFee = 50.00;
  const total = subTotal - discount + deliveryFee;

  return (
    <div className='min-h-screen bg-white py-12 px-4'>
      {/* Header */}
      <div className='max-w-7xl mx-auto mb-8'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
            </svg>
            <span className='text-xl font-semibold'>skyrise decor</span>
          </div>
          <button className='px-6 py-2 border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors'>
            Let's Talk!
          </button>
        </div>
        <h1 className='text-4xl font-bold mb-2'>Shopping Cart</h1>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Side - Cart Items */}
        <div className='lg:col-span-2 bg-gray-50 rounded-2xl p-8'>
          {/* Table Header */}
          <div className='grid grid-cols-12 gap-4 pb-4 border-b border-gray-300 mb-6'>
            <div className='col-span-5 text-sm font-medium text-gray-700'>Product Code</div>
            <div className='col-span-3 text-sm font-medium text-gray-700 text-center'>Quantity</div>
            <div className='col-span-2 text-sm font-medium text-gray-700 text-center'>Total</div>
            <div className='col-span-2 text-sm font-medium text-gray-700 text-center'>Action</div>
          </div>

          {/* Cart Items */}
          {cartItems.map((obj, index) => (
            <div key={obj._id || index} className='grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-200 last:border-b-0'>
              {/* Product Info */}
              <div className='col-span-5 flex items-center gap-4'>
                <div className='w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center'>
                  <img src={obj.image} alt={obj.name} className='w-full h-full object-contain' />
                </div>
                <div>
                  <h3 className='font-semibold text-base mb-1'>{obj.name}</h3>
                  <p className='text-sm text-gray-500'>Set • Colour: {obj.color || 'Coffee'}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className='col-span-3 flex justify-center'>
                <div className='flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2'>
                  <button className='text-lg font-medium hover:text-gray-600'>-</button>
                  <span className='text-base font-medium min-w-[20px] text-center'>{obj.quantity || 1}</span>
                  <button className='text-lg font-medium hover:text-gray-600'>+</button>
                </div>
              </div>

              {/* Price */}
              <div className='col-span-2 text-center'>
                <span className='text-lg font-semibold'>${obj.price}</span>
              </div>

              {/* Remove Button */}
              <div className='col-span-2 flex justify-center'>
                <button className='p-2 hover:bg-gray-200 rounded-lg transition-colors'>
                  <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Update Cart Button */}
          <div className='mt-8'>
            <button className='bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors'>
              Update Cart
            </button>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className='lg:col-span-1'>
          <div className='bg-gray-50 rounded-2xl p-6'>
            <h2 className='text-xl font-bold mb-6'>Order Summary</h2>

            {/* Discount Code */}
            <div className='mb-6'>
              <input
                type='text'
                placeholder='Discount code/Promo code'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 text-sm focus:outline-none focus:border-gray-400'
              />
              <button className='w-full px-4 py-3 border border-black rounded-lg text-sm font-medium hover:bg-black hover:text-white transition-colors'>
                Apply
              </button>
            </div>

            {/* Summary Details */}
            <div className='space-y-3 mb-6 pb-6 border-b border-gray-300'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Sub-Total</span>
                <span className='font-medium'>{subTotal.toFixed(2)} USD</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Discount (-50%)</span>
                <span className='font-medium text-red-600'>-{discount.toFixed(2)} USD</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Delivery Fee</span>
                <span className='font-medium'>{deliveryFee.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Total */}
            <div className='flex justify-between items-center mb-6'>
              <span className='text-base font-medium'>Total</span>
              <span className='text-2xl font-bold'>${total.toFixed(2)} USD</span>
            </div>

            {/* Warranty Info */}
            <div className='mb-6 p-3 bg-white rounded-lg'>
              <div className='flex items-start gap-2'>
                <input type='checkbox' className='mt-1' />
                <p className='text-xs text-gray-600'>
                  90 Day Limited Warranty against manufacturer defects{' '}
                  <a href='#' className='underline'>Details</a>
                </p>
              </div>
            </div>

            {/* Checkout Button */}
            <button className='w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors'>
              Checkout Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className='max-w-7xl mx-auto mt-16'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Build custom furniture</p>
            <h2 className='text-3xl font-bold'>Craft Own Furniture</h2>
          </div>
          <button className='px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors'>
            Let's Talk!
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className='max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='text-sm text-gray-600'>
            <p>©2023. All right reserved.</p>
            <p className='font-semibold'>SEATIVE DIGITAL</p>
          </div>
          <div className='flex gap-4'>
            <button className='px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors'>Facebook</button>
            <button className='px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors'>Instagram</button>
            <button className='px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors'>Twitter</button>
            <button className='px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors'>LinkedIn</button>
          </div>
          <div className='text-sm text-right'>
            <p>36 East 78th street</p>
            <p className='font-semibold'>NEW YORK, NY</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
