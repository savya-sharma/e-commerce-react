import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import instance from '../config/axiosConfig'



const SingleProduct = () => {



  // async function handleAddToCart(idToCart) {
  //   const userId = 1; // assuming logged-in user ID
  //   const cartId = 1; // assuming the cart ID (fakestore has carts 1–20)

  //   try {
  //     // 1️⃣ Get the existing cart

  //     const response = await instance.get(`carts/${cartId}`);
  //     let product_arr = response.data.products || [];


  //     // 2️⃣ Check if product with idToCart is already in the cart (match id)
  //     let found = false;
  //     product_arr = product_arr.map((item) => {
  //       if (item.productId === idToCart) {
  //         found = true;
  //         // 3️⃣ Increase quantity if already in cart
  //         return { ...item, quantity: item.quantity + 1 };
  //       }
  //       return item;
  //     });

  //     if (!found) {
  //       // 4️⃣ If not in cart, add as a new product
  //       product_arr.push({
  //         productId: idToCart,
  //         quantity: 1,
  //       });
  //       console.log(`Added new product ${idToCart}`);
  //     } else {
  //       console.log(`Increased quantity for product ${idToCart}`);
  //     }

  //     // 5️⃣ Send updated cart back to the API (PUT)
  //     const updatedCart = {
  //       userId,
  //       id,
  //       date: new Date().toISOString().split("T")[0],
  //       products: product_arr,
  //     };

  //     const updateResponse = await instance.put(`carts/${cartId}`, updatedCart);
  //     console.log("Cart updated:", updateResponse.data);

  //   } catch (error) {
  //     console.error("Error updating cart:", error);
  //   }
  // }



  const { id } = useParams();

  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSingleData(id);
    console.log(id)
  }, [id])

  async function getSingleData() {
    setLoading(true);
    const response = await instance.get("/products/" + id);
    setSingleProduct(response.data);
    setLoading(false);
  }
  if (loading) return <h1>Loading...</h1>

  return (

    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full flex justify-center items-center p-8 bg-[#f6f6f6]">
        <div className="w-[320px] h-[320px] flex items-center justify-center rounded-lg shadow-md bg-white">
          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="object-contain max-h-[220px] max-w-full"
          />
        </div>
      </div>


      <div className="lg:w-1/2 w-full p-8 flex flex-col justify-center">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[2.1rem] font-[machina-bold] tracking-tight text-[#252525] mb-1">{singleProduct.title}</h1>
            <h2 className="uppercase text-xs tracking-[0.2em] text-[#b7b7b7] font-[machina-light] mb-7">{singleProduct.category}</h2>
          </div>
          <span className="text-lg md:text-2xl font-semibold text-[#252525]">${singleProduct.price}</span>
        </div>
        <div className="mb-7">
          <p className="text-[#444] text-base font-[machina-light] leading-relaxed max-w-[520px]">{singleProduct.description}</p>
        </div>
        <div className="flex items-center gap-4 mb-7">
          <span className="block w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#aaa]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="w-5 h-5"><circle cx="10" cy="10" r="7" stroke="#aaa" strokeWidth="2" /></svg>
          </span>
          <span className="block w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#aaa]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="w-5 h-5"><rect x="3" y="6" width="14" height="8" rx="4" stroke="#aaa" strokeWidth="2" /></svg>
          </span>
          <span className="block w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#aaa]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="w-5 h-5"><path d="M5 9.5C5 7.567 6.567 6 8.5 6s3.5 1.567 3.5 3.5S10.433 13 8.5 13 5 11.433 5 9.5Z" stroke="#aaa" strokeWidth="2" /></svg>
          </span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center border rounded bg-[#fafafa] px-3 py-1 w-max">
            <button className="text-2xl font-semibold px-2 text-[#999] focus:outline-none" onClick={() => { }}>-</button>
            <span className="px-3 text-lg font-[machina-medium]">1</span>
            <button className="text-2xl font-semibold px-2 text-[#999] focus:outline-none" onClick={() => { }}>+</button>
          </div>
          <button onClick={() => handleAddToCart(singleProduct.id)} className="bg-[#111] text-white px-12 py-3 font-[machina-bold] rounded transition hover:bg-[#252525] text-base tracking-wider" >
            add to cart
          </button>
        </div>
      </div>
    </div>
  )
}


export default SingleProduct
