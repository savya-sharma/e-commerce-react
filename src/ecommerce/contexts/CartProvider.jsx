import React, { createContext, useContext, useReducer } from 'react'

const cartContext = createContext();

const localStorageCart = () => {
  const stored = localStorage.getItem("storedCart");
  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};


const initialState = {
  cart: localStorageCart(),
  cartItems: localStorageCart(),
};
// console.log(initialState)


// const [cart, setCart] = useState(0);
// const [cartItems, setCartItems] = useState(0);

//action tells the reducer wwhat changes to maketo the state!
function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'SET_CART_ITEMS':
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
}


const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const setCart = (payload) => dispatch({ type: 'SET_CART', payload });
  const setCartItems = (payload) => dispatch({ type: 'SET_CART_ITEMS', payload });

  return (
    <cartContext.Provider
      value={{
        cart: state.cart,
        setCart,
        cartItems: state.cartItems,
        setCartItems,
        // dispatch,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

export function useCart() {
  return useContext(cartContext);
}
export default CartProvider;