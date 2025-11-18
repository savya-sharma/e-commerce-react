import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartProvider'
import instance from '../config/axiosConfig';
import { useCurrency } from '../contexts/Currency';

const Cart = () => {
  const { cart, cartItems, setCartItems } = useCart();

  // Get functions to convert price and get currency symbol (₹, $, €)
  const { convertPrice, getCurrencySymbol } = useCurrency();
  console.log(cart)

  // quantity state to store quantities of each item, aligned by index
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    getCartProducts();
  }, [cart]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const newQuantities = cart.map(item => {
        if (item && typeof item.quantity === 'number' && item.quantity > 0) {
          return item.quantity;
        } else {
          return 1;
        }
      });
      setQuantity(newQuantities);
    } else {
      setQuantity([]);
    }
  }, [cart]);


  useEffect(() => {
    // localStorage.setItem("storedCart", JSON.stringify(cart));  
    localStorage.setItem("storedCart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    handleRemove();
  }, [cart])


  async function getCartProducts() {
    const promises = cart.map((obj) => {
      return instance.get("/product/product/" + obj.id);
    });
    let temp = await Promise.all(promises);
    setCartItems(temp.map((obj) => obj.data));
  }



  function handleQuantityChange(action, index) {
    setQuantity(prevQuantity => {
      const updatedQuantities = [...prevQuantity];

      if (action === 'increment') {
        updatedQuantities[index] = (updatedQuantities[index] || 1) + 1;
      } else if (action === 'decrement') {
        const currentQty = updatedQuantities[index] || 1;
        updatedQuantities[index] = currentQty > 1 ? currentQty - 1 : 1;
      }

      return updatedQuantities;
    });
  }

  function totalPrice() {
    let total = 0;

    cartItems.forEach((item, idx) => {
      const qty = quantity[idx] || 1;
      total += item.price * qty;
    });

    return total;
  }

  function handleRemove(id) {
    return setCartItems(cartItems.filter((obj) => obj._id !== id));
  }

  return (
    <div className='min-h-screen bg-white py-12 px-4 font-[machina-light]'>
      {/* Header */}
      <div className='max-w-7xl mx-auto mb-8'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
            </svg>
            <span className='text-xl font-semibold'>skyrise decor</span>
          </div>
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
            <div className='col-span-2 text-sm font-medium text-gray-700 text-center'>Price</div>
            <div className='col-span-2 text-sm font-medium text-gray-700 text-center'>Action</div>
          </div>

          {/* Cart Items */}
          {cartItems.map((obj, index) => (
            <div key={obj._id} className='grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-200 last:border-b-0'>
              {/* Product Info */}
              <div className='col-span-5 flex items-center gap-4'>
                <div className='w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center'>
                  <img src={obj.image} alt={obj.name} className='w-full h-full object-contain' />
                </div>
                <div>
                  <h3 className='font-semibold text-base mb-1'>{obj.name}</h3>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className='col-span-3 flex justify-center'>
                <div className='flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2'>
                  <button onClick={() => handleQuantityChange('decrement', index)} className='text-lg font-medium hover:text-gray-600'>-</button>
                  {/* show current quantity for this product */}
                  <span className='text-base font-medium min-w-[20px] text-center'>{quantity[index] || 1}</span>
                  <button onClick={() => handleQuantityChange('increment', index)} className='text-lg font-medium hover:text-gray-600'>+</button>
                </div>
              </div>

              {/* Price - Show in selected currency */}
              <div className='col-span-2 text-center'>
                <span className='text-lg font-semibold'>
                  {/* getCurrencySymbol() = ₹ or $ or € */}
                  {/* convertPrice() = converts INR to selected currency */}
                  {getCurrencySymbol()} {convertPrice(obj.price * (quantity[index] || 1))}
                </span>
              </div>

              {/* Remove Button */}
              <div className='col-span-2 flex justify-center'>
                <button onClick={() => handleRemove(obj._id)} className='p-2 hover:bg-gray-200 rounded-lg transition-colors'>
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

            {/* Total - Show in selected currency */}
            <div className='flex justify-between items-center mb-6'>
              <span className='text-base font-medium'>Total</span>
              {/* totalPrice() calculates total in INR, then convertPrice() converts to selected currency */}
              <span className='text-2xl font-bold'>{getCurrencySymbol()} {convertPrice(totalPrice())}</span>
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
        </div>
      </div>
    </div>
  )
}

export default Cart
