import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import instance from '../config/axiosConfig'
import { useCart } from '../contexts/CartProvider';
import { useCurrency } from '../contexts/Currency';

const SingleProduct = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  // Get formatPrice function to convert price to selected currency
  const { formatPrice } = useCurrency();
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    getSingleData(id);
  }, [id])

  async function getSingleData(id) {
    setLoading(true);
    const response = await instance.get("/product/product/" + id);
    setSingleProduct(response.data);
    setLoading(false);
  }

  // Handle quantity increment
  function handleIncrement() {
    setQuantity(prev => prev + 1);
  }

  // Handle quantity decrement
  function handleDecrement() {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  }

  // Add to cart with Firebase sync
  function handleAddToCart(idToAdd) {
    const success = addToCart(idToAdd, quantity);
    if (success) {
      setAddedToCart(true);
      // Reset the "Added to cart" message after 2 seconds
      setTimeout(() => setAddedToCart(false), 2000);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  )

  return (

    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row font-[halve-light]">
      <div className="lg:w-1/2 w-full flex justify-center items-center p-8 bg-[#f6f6f6]">
        <div className="w-[320px] h-[320px] flex items-center justify-center rounded-lg shadow-md bg-white">
          <img
            src={singleProduct.image}
            alt={singleProduct.name}
            className="object-contain max-h-[220px] max-w-full"
          />
        </div>
      </div>


      <div className="lg:w-1/2 w-full p-8 flex flex-col justify-center">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[2.1rem] font-[halve-light] tracking-tight text-[#252525] mb-1">{singleProduct.name}</h1>
          </div>
          {/* Show price in selected currency (formatPrice converts INR to USD/EUR etc.) */}
          <span className="text-lg md:text-2xl font-semibold text-[#252525]">{formatPrice(singleProduct.price)}</span>
        </div>
        <div className="mb-7">
          <p className="text-[#444] text-base font-[halve-light] leading-relaxed max-w-[520px]">{singleProduct.description}</p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center border rounded bg-[#fafafa] px-3 py-1 w-max">
            <button
              className="text-2xl font-semibold px-2 text-[#999] hover:text-[#111] focus:outline-none transition"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="px-3 text-lg font-[halve-medium] min-w-[30px] text-center">{quantity}</span>
            <button
              className="text-2xl font-semibold px-2 text-[#999] hover:text-[#111] focus:outline-none transition"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <button
            onClick={() => handleAddToCart(singleProduct._id)}
            className="bg-[#111] text-white px-12 py-3 font-[machina-bold] rounded transition hover:bg-[#252525] text-base tracking-wider relative"
          >
            {addedToCart ? '✓ Added to cart!' : 'Add to cart'}
          </button>
        </div>

        {addedToCart && (
          <div className="mt-4 text-green-600 font-semibold">
            Item added to cart successfully!
          </div>
        )}
      </div>
    </div>
  )
}


export default SingleProduct
