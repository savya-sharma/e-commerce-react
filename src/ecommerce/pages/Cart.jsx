import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../config/axiosConfig'

const Cart = () => {

  if (loading) return <h1>Loading...</h1>

  return (
    <div className='w-full h-screen'>
      cart
      <div>
        <div>
          <img src={cartProducts.image} alt="" />
        </div>
        <h3>{cartProducts.title}</h3>
        <h3>{cartProducts.price}</h3>
        <h3>{cartProducts.category}</h3>
        <p>{cartProducts.description}</p>
      </div>
    </div>
  )
}

export default Cart
