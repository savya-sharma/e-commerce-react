import React, { createContext, useContext, useState } from 'react'

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    localStorage.getItem("storedCart") !== null
      ? JSON.parse(localStorage.getItem("storedCart"))
      : []
  );

  const [cartItems, setCartItems] = useState(

    localStorage.getItem("storedCart") !== null
      ? JSON.parse(localStorage.getItem("storedCart"))
      : []
  );

  return (
    <cartContext.Provider value={{ cart, setCart, cartItems, setCartItems }}>
      {children}
    </cartContext.Provider>
  )
}

export function useCart() {
  return useContext(cartContext);
}
export default CartProvider;