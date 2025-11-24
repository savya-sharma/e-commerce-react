import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const CartContext = createContext();
const db = getFirestore();

function getLocalCart() {
  try {
    const stored = localStorage.getItem("storedCart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const initialState = {
  cart: getLocalCart(),
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const ref = doc(db, "userCarts", user.uid);
          const d = await getDoc(ref);
          if (d.exists() && Array.isArray(d.data().cart)) {
            dispatch({ type: "SET_CART", payload: d.data().cart });
          }
        } catch (e) {
          // fail quietly
        }
      }
    });
    return unsub;
  }, []);

  // persist & backup to Firestore
  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(state.cart));
    const user = auth.currentUser;
    if (user) {
      setDoc(
        doc(db, "userCarts", user.uid),
        { cart: state.cart, updatedAt: new Date().toISOString() },
        { merge: true }
      ).catch(() => {});
    }
  }, [state.cart]);

  const addToCart = (productId, quantity = 1) => {
    const idx = state.cart.findIndex((i) => i.id === productId);
    let newCart;
    if (idx >= 0) {
      newCart = state.cart.map((it, k) =>
        k === idx ? { ...it, quantity: it.quantity + quantity } : it
      );
    } else {
      newCart = [...state.cart, { id: productId, quantity }];
    }
    dispatch({ type: "SET_CART", payload: newCart });
    return true;
  };

  const removeFromCart = (productId) => {
    const newCart = state.cart.filter((i) => i.id !== productId);
    dispatch({ type: "SET_CART", payload: newCart });

    // Remove also from cartItems, if relevant
    dispatch({
      type: "SET_CART_ITEMS",
      payload: state.cartItems.filter((item) => item._id !== productId),
    });
    return true;
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    const newCart = state.cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    dispatch({ type: "SET_CART", payload: newCart });
  };

  const clearCart = () => {
    dispatch({ type: "SET_CART", payload: [] });
    dispatch({ type: "SET_CART_ITEMS", payload: [] });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        cartItems: state.cartItems,
        setCart: (payload) => dispatch({ type: "SET_CART", payload }),
        setCartItems: (payload) => dispatch({ type: "SET_CART_ITEMS", payload }),
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;  