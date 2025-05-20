import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => [...prev, product]);
    };

    // so do not look up by id cuz that breaks everything
    const removeFromCart = (index) => {
        if (index >= 0) {
            const updatedItems = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
            console.log(updatedItems);
            setCartItems(updatedItems);
        }
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};