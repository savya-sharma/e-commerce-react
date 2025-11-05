import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../config/axiosConfig'

const Cart = () => {

  const { id } = useParams();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/carts/${id}`);
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCart(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCart();
    }
  }, [id]);

  if (loading) return <h1>Loading...</h1>

  return (
    <div className='w-full h-screen'>
      cart
      <div>
        <div>
          <img src={cart.image} alt="" />
        </div>
        <h3>{cart.title}</h3>
        <h3>{cart.price}</h3>
      </div>
    </div>
  )
}

export default Cart
