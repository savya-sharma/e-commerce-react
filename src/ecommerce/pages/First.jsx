import axios from 'axios'
import React, { useEffect } from 'react'

const First = () => {
  // const [data, setData] = React.useState([])
  const [product, setProduct] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    getData();
  })

  async function getData() {
    const url = await axios.get('https://fakestoreapi.com/products')
    setProduct(url.data)
  }

  function trimContent(input, len) {
    const arr = input.split("")
    return arr.length > len ? arr.slice(0, len).join("") + "..." : input
  }
  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div className="min-h-screen flex flex-wrap justify-center gap-8 py-8">
        {product.length > 0 && product.map((obj) => (
          <div
            key={obj.id}
            className="shadow-md rounded-lg bg-white p-4 w-[220px] flex flex-col items-center transition-transform duration-200"
          >
            <a href={`/product/${obj.id}`}>
              <img
                src={obj.image}
                alt={obj.title}
                className="h-[150px] object-contain mb-4"
              />
            </a>
            <h3 className="text-[1.1rem] font-semibold mb-2 text-center">
              <a href={`/product/${obj.id}`}>
                {trimContent(obj.title, 9)}
              </a>
            </h3>
            <p className="text-teal-600 text-[1.2rem] font-bold m-0">${obj.price}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default First