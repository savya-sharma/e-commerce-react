import Lenis from 'lenis'
import { useState } from 'react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import instance from '../config/axiosConfig'
import { useCurrency } from '../contexts/Currency'


const First = () => {
  // Step 1: Get the formatPrice function from Currency context
  // formatPrice will convert INR price to selected currency and add symbol
  const { formatPrice } = useCurrency();
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  /////////////////////////////////////////////






  // Step 2: Create state to store products from API
  const [product, setProducts] = useState([]);  // Empty array initially
  const [loading, setLoading] = useState(false);  // Loading state

  // Step 3: Fetch products when component loads (runs only once)
  useEffect(() => {
    getData();  // Call getData function
  }, []);  // Empty [] means run only once when page loads

  // Step 4: Function to get products from API
  async function getData() {
    try {
      setLoading(true);  // Show loading
      const response = await instance.get("/product/get");  // Get data from API
      setProducts(response.data);  // Save products in state
      setLoading(false);  // Hide loading
    } catch (error) {
      console.error("Error fetching data:", error);  // Show error if API fails
    }
  }

  if (loading) return <div className="loader">Loading.....</div>

  return (
    <>
      <div className="min-h-screen w-full bg-white py-8 font-[halve-light]">
        <div className="max-w-7xl mx-auto">
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {product.length > 0 && product.map((obj) => (
              <div
                key={obj._id}
                className="group relative bg-[#E8E8E8] hover:bg-[#E0E0E0] transition-colors duration-200"
              >
                {/* Product Image Container */}
                <Link to={`/product/${obj._id}`} className="block relative aspect-[3/3] overflow-hidden">
                  <img
                    src={obj.image}
                    alt={obj.name}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Bookmark Icon - Top Right */}
                </Link>

                {/* Product Info */}
                <div className="p-4 bg-white">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-normal uppercase tracking-wide text-gray-900 mb-1">
                        <Link to={`/product/${obj._id}`} className="hover:underline">
                          {obj.name}
                        </Link>
                      </h3>
                      {/* Step 5: Show price in selected currency */}
                      {/* formatPrice converts INR to selected currency and adds symbol */}
                      <p className="text-sm text-gray-900">{formatPrice(obj.price)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default First