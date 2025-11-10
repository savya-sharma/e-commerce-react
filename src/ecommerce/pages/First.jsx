import Lenis from 'lenis'
import { useState } from 'react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import instance from '../config/axiosConfig'


const First = () => {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  /////////////////////////////////////////////






  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const response = await instance.get("/product/get");
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  function trimContent(input, len) {
    let arr = input.split(" ");
    return arr.length > len ? arr.slice(0, len).join(" ") + "..." : input;
  }

  if (loading) return <div className="loader">Loading.....</div>

  return (
    <>
      <div className="min-h-screen w-full flex items-stretch justify-stretch">
        <div className="w-full bg-[#F9F7FA] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4">
          {product.length > 0 && product.map((obj) => (
            <div
              key={obj._id}
              className="shadow-lg text-[#C63E21] bg-[#EEECEF] flex flex-col items-center p-8 min-h-[400px] min-w-[270px]"
            >
              <Link to={`/product/${obj._id}`} className="w-full flex justify-center">
                <img
                  src={obj.image}
                  alt={obj.title}
                  className="h-[220px] object-contain mb-6 w-full"
                />
              </Link>
              <h3 className="text-[1.3rem] font-[machina-bold] mb-3 text-center w-full">
                <Link to={`/product/${obj._id}`}>
                  {obj.name}
                </Link>
              </h3>
              <p className="text-[1.4rem] font-[machina-light] m-0">${obj.price}</p>
              {/* <Link to="/cart" className='pt-7'>
                <h2 className='font-[machina-bold] font-bold border px-10 py-2 rounded border-[#C63E21]/40 text-[#C63E21]'>
                  Add
                </h2>
              </Link> */}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default First